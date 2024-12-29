import React, { useContext, useEffect, useState } from "react";

import {
  Auth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  User,
} from "firebase/auth";

import {
  IonButton,
  IonContent,
  IonLabel,
  IonLoading,
  IonModal,
} from "@ionic/react";
import { useHistory } from "react-router";
import { authenticatedRoutesOutlet, loginRoutesOutlet } from "../../App";

import { ContextLanguage } from "../contextLanguage";
import { ContextToast } from "../systemEvents/contextToast";

import { textAuthContext } from "./textAuthContext";
import { auth, db } from "../../firebase/firebaseConfig";
import { ContextManagerLobbyProvider } from "../lobby/contextManagerLobby";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

type AuthType = {
  authenticateUser: User | undefined;
  auth: Auth;
};

export const AuthContext = React.createContext<AuthType>({
  authenticateUser: undefined,
  auth,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = () => {
  // VARIABLES ------------------------------
  const history = useHistory();
  const { l } = useContext(ContextLanguage);
  const { toast } = useContext(ContextToast);
  // USE STATES -----------------------------
  const [authenticateUser, setAuthenticateUser] = useState<User | undefined>(
    undefined
  );
  const [currentAuth, setCurrentAuth] = useState<Auth>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVerifyEmailSend, setIsModalVerifyEmailSend] =
    useState<boolean>(false);
  // USE EFFECTS -----------------------------
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthenticateUser(user == null ? undefined : user);
      setCurrentAuth(auth);
      setIsLoading(false);
      if (user) {
        console.log("user?.emailVerified ", user?.emailVerified);
        if (user?.emailVerified) {
          _handleUserSignIn(user);
        } else {
          setIsModalVerifyEmailSend(true);
          signOut(auth);
        }

        history.push("/");
      } else {
        history.replace("/");
      }
    });
  }, []);
  // FUNCTIONS ------------------------------
  const handleSendAgainVerification = async () => {
    try {
      await sendEmailVerification(currentAuth!.currentUser!).then(() => {
        toast("success", textAuthContext[l].success_verificationAgain);
      });
    } catch (error) {
      toast("danger", textAuthContext[l].error_generico);
    }
  };

  const _handleUserSignIn = async (user: User) => {
    try {
      const userDocRef = doc(db, import.meta.env.VITE_SITE_DB_USERS, user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // User document doesn't exist, create it
        await _storeUserData(user);
        toast("success", textAuthContext[l].info_welcome);
      } else {
        // User document exists, welcome back
        toast("success", textAuthContext[l].info_welcome_back);
      }

      setAuthenticateUser(user); // Set authenticated user *after* checking/creating Firestore document
      setIsModalVerifyEmailSend(false);
      history.push("/");
    } catch (error) {
      toast("danger", "Error handling user sign-in.");
      console.error("Error handling user sign-in:", error);
    }
  };

  const _storeUserData = async (user: User) => {
    try {
      const usersCollection = doc(
        db,
        import.meta.env.VITE_SITE_DB_USERS,
        user.uid
      ); // Use doc to create or update user document

      const userData = {
        userUID: user.uid,
        createdAtTimestamp: serverTimestamp(),
        email: user.email,
      };

      await setDoc(usersCollection, userData, { merge: true }); // Use setDoc with merge: true to avoid overwriting data if it exists
    } catch (error) {
      toast("danger", "Error saving user data."); // Show error toast
      console.error("Error storing user data in Firestore:", error);
    }
  };
  // RETURN ----------------------------------
  return (
    <AuthContext.Provider
      value={{
        auth,
        authenticateUser,
      }}
    >
      {isLoading ? (
        <IonLoading
          isOpen={isLoading}
          duration={2000}
          message="Loading..."
          spinner="circles"
        />
      ) : null}
      {authenticateUser?.emailVerified == true ? (
        <ContextManagerLobbyProvider>
          <>
            {authenticatedRoutesOutlet()}
            {/* ---------- EXTRA UI ---------- */}
          </>
        </ContextManagerLobbyProvider>
      ) : (
        loginRoutesOutlet()
      )}

      {!authenticateUser?.emailVerified ? (
        <IonModal
          isOpen={isModalVerifyEmailSend}
          onDidDismiss={() => setIsModalVerifyEmailSend(false)}
          initialBreakpoint={0.35}
          breakpoints={[0.35, 0.5]}
        >
          <IonContent>
            <IonLabel>
              <h2 className={"forgotTitle"}>
                {textAuthContext[l].modalVerifySendTitle}
              </h2>
            </IonLabel>
            <div className="ion-padding">
              <IonLabel>
                <p>{textAuthContext[l].modalVerifySendParagraph}</p>
              </IonLabel>

              <IonLabel>
                <p className="ion-padding-top">
                  {textAuthContext[l].modalVerifyCheck}
                </p>
              </IonLabel>
              <div className="ion-padding">
                <IonButton
                  expand="block"
                  fill="clear"
                  onClick={handleSendAgainVerification}
                >
                  {textAuthContext[l].btn_sendVerifyAgain}
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>
      ) : null}
    </AuthContext.Provider>
  );
};
