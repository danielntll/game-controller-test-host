import styles from "./ModalLobbyAddFriends.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { typeUserToFE } from "../../types/typeUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { sendOutline } from "ionicons/icons";
import { useAuthContext } from "../../context/auth/contextAuth";

interface ContainerProps {
  isOpen: boolean;
  onDismiss: () => void;
  callbackToggleFriend: (friend: typeUserToFE) => void;
}

const ModalLobbyAddFriends: React.FC<ContainerProps> = ({
  isOpen,
  onDismiss,
  callbackToggleFriend,
}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { auth } = useAuthContext();
  //USE STATES -----------------------
  const [_searchTerm, _setSearchTerm] = useState<string>("");
  const [_searchResults, _setSearchResults] = useState<typeUserToFE[]>([]);
  const [_isLoading, _setIsLoading] = useState<boolean>(false);
  const [_isYourSelf, _setYourSelf] = useState<boolean>(false);
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  const _handleSearch = async () => {
    if (_searchTerm === auth?.currentUser?.email) {
      _setYourSelf(true);
      return;
    }
    _setIsLoading(true);
    try {
      const usersCollection = collection(
        db,
        import.meta.env.VITE_SITE_DB_USERS
      );
      const q = query(usersCollection, where("email", "==", _searchTerm));
      const querySnapshot = await getDocs(q);

      const results: typeUserToFE[] = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data() as typeUserToFE);
      });

      _setSearchResults(results);
    } catch (error) {
      // Handle error
      console.error("Error searching users:", error);
    } finally {
      _setIsLoading(false);
    }
  };

  const _handleClose = () => {
    _setSearchTerm("");
    _setSearchResults([]);
    onDismiss();
  };

  const _handleInput = (input: string) => {
    if (_isYourSelf === true) {
      _setYourSelf(false);
    }
    _setSearchTerm(input);
  };
  //RETURN COMPONENT -----------------
  return (
    <>
      <IonModal isOpen={isOpen} onDidDismiss={_handleClose}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color={"medium"} onClick={_handleClose}>
                {text[l].btn__close}
              </IonButton>
            </IonButtons>
            <IonTitle>{text[l].componentTitle}</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <div className={styles.searchbar + " ion-no-padding"}>
              <IonSearchbar
                showClearButton="always"
                placeholder={text[l].searchbarPlaceholder}
                value={_searchTerm}
                onInput={(e) => _handleInput(e.currentTarget.value ?? "")}
              ></IonSearchbar>
              <IonButton
                fill="clear"
                color={!_searchTerm.length ? "medium" : "primary"}
                onClick={_handleSearch}
                disabled={!_searchTerm.length}
              >
                <IonIcon icon={sendOutline} />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {_isYourSelf ? (
            <IonLabel>
              <p className="ion-padding">{text[l].yourSelf}</p>
            </IonLabel>
          ) : (
            <>
              {_isLoading && (
                <IonLabel>
                  <p className="ion-padding">{text[l].loading}</p>
                </IonLabel>
              )}
              <IonList inset>
                {_searchResults.map((user) => (
                  <IonItem
                    key={user.userUID}
                    onClick={() => callbackToggleFriend(user)}
                  >
                    <IonCheckbox justify="space-between">
                      <IonLabel>{user.email}</IonLabel>
                    </IonCheckbox>
                  </IonItem>
                ))}
              </IonList>
              {!_isLoading &&
                _searchResults.length === 0 &&
                _searchTerm.length > 0 && ( // Check if there are no results ONLY after a search and it's not still loading
                  <IonLabel>
                    <p className="ion-padding">{text[l].noResults}</p>
                  </IonLabel>
                )}
            </>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

export default ModalLobbyAddFriends;
