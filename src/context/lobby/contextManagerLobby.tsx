import React, { useEffect, useState } from "react";
import { useContextLanguage } from "../contextLanguage";
import { useContextToast } from "../systemEvents/contextToast";
import { useAuthContext } from "../auth/contextAuth";
import {
  arrayUnion,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  typeNewLobbyDataToBE,
  typeNewLobbyDataToFE,
} from "../../types/typeNewLobbyData";
import ModalLobbyCreateNew from "../../components/Modal__Lobby__Create__New/ModalLobbyCreateNew";
import { typeUserToFE } from "../../types/typeUser";
import ModalLobbyAddFriends from "../../components/Modal__Lobby__Add__Friends/ModalLobbyAddFriends";
import { db } from "../../firebase/firebaseConfig";
import { typeNotificationInvitation } from "../../types/typeNotificationInvitation";
import { text } from "./text";

type contextManagerLobby = {
  handleCreateNewLobby: (gameUID: string) => void;
  handleJoinLobby: (data: any) => void;
  handleLeaveLobby: (data: any) => void;
  handleAddFriendsToCurrentLobby: (gameUID: string, lobbyUID: string) => void;
  handleDeleteNotification: (notification: typeNotificationInvitation) => void;
  notifications: typeNotificationInvitation[];
  friendsAddedToCurrentLobby: typeUserToFE[];
  activeLobbies: typeNewLobbyDataToFE[];
  isLobbiesLoading: boolean;
};

const ContextManagerLobby = React.createContext<contextManagerLobby>({
  handleCreateNewLobby: () => {},
  handleJoinLobby: () => {},
  handleLeaveLobby: () => {},
  handleAddFriendsToCurrentLobby: () => {},
  handleDeleteNotification: () => {},
  notifications: [],
  friendsAddedToCurrentLobby: [],
  activeLobbies: [],
  isLobbiesLoading: false,
});

export const useContextManagerLobby = () =>
  React.useContext(ContextManagerLobby);

export const ContextManagerLobbyProvider = ({ children }: any) => {
  // VARIABLES ------------------------------
  const { l } = useContextLanguage();
  const { authenticateUser } = useAuthContext();
  const { toast } = useContextToast();
  // USE STATE ------------------------------
  // ######### Creating Lobby #########
  // -- Modal status
  const [
    _isModalLobbyCreatedOpenWithGameUID,
    _setIsModalLobbyCreatedOpenWithGameUID,
  ] = useState<string | undefined>(undefined);
  // -- Loading status
  const [_isLobbyCreateLoading, _setIsLobbyCreateLoading] =
    useState<boolean>(false);

  // -- Tutte le Lobby Attive
  const [activeLobbies, setActiveLobbies] = useState<typeNewLobbyDataToFE[]>(
    []
  );
  // -- Loading Status All Lobbies
  const [isLobbiesLoading, setIsLobbiesLoading] = useState<boolean>(false);

  // ######### Managing Own Lobby #########
  const [friendsAddedToCurrentLobby, _setFriendsAddedToCurrentLobby] = useState<
    typeUserToFE[]
  >([]);
  const [_isModalAddFriendsOpen, _setIsModalAddFriendsOpen] =
    useState<boolean>(false);
  const [_currentLobbyUID, _setCurrentLobbyUID] = useState<string | null>(null);
  const [_currentGameUID, _setCurrentGameUID] = useState<string | null>(null);

  //
  const [notifications, setNotifications] = useState<
    typeNotificationInvitation[]
  >([]);

  // ######### Join Lobby #########
  // -- Modal status
  // -- Loading status
  // -- Data of Joined lobby
  // USE EFFECT -----------------------------
  useEffect(() => {
    if (authenticateUser !== undefined) {
      initData();
    }
  }, [authenticateUser]);

  useEffect(() => {
    if (authenticateUser) {
      // Only listen if authenticated user exists
      const notificationsCollection = collection(
        db,
        import.meta.env.VITE_SITE_DB_NOTIFICATIONS,
        authenticateUser.uid,
        import.meta.env.VITE_SITE_DB_INVITATIONS
      ); // create reference for the invitations subcollection

      const unsubscribe = onSnapshot(notificationsCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newInvitation =
              change.doc.data() as typeNotificationInvitation; // Correctly type the notification
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              newInvitation,
            ]);
            console.log("New Invitation:", newInvitation);
            toast("success", `New invite for ${newInvitation.lobbyName}`); //  Example: showing a toast
          }
        });
      });

      return () => unsubscribe(); // Unsubscribe when component unmounts
    }
  }, [authenticateUser]);

  // FUNCTIONS ------------------------------
  const initData = async () => {
    setIsLobbiesLoading(true);
    try {
      const db = getFirestore();
      const lobbyCollection = collection(
        db,
        import.meta.env.VITE_SITE_DB_LOBBY
      );

      const q = query(
        lobbyCollection,
        where("createdBy", "==", authenticateUser!.uid),
        where("status", "==", "open")
      );

      const querySnapshot = await getDocs(q);
      const activeLobbies: typeNewLobbyDataToFE[] = [];
      querySnapshot.forEach((doc) => {
        activeLobbies.push({
          lobbyUID: doc.id,
          ...(doc.data() as typeNewLobbyDataToBE),
        });
      });

      setActiveLobbies(activeLobbies);
    } catch (error) {
      toast("danger", "Error fetching lobbies.");
      console.error("Error fetching active lobbies:", error);
    } finally {
      setIsLobbiesLoading(false);
    }
  };

  const handleCreateNewLobby = async (gameUID: string) => {
    _setIsModalLobbyCreatedOpenWithGameUID(gameUID);
  };

  const handleJoinLobby = async (data: any) => {};

  const handleLeaveLobby = async (data: any) => {};

  const _putLobby = async (gameUID: string, lobbyName: string) => {
    _setIsLobbyCreateLoading(true);
    try {
      const db: Firestore = getFirestore();
      const lobbyCollection: CollectionReference<DocumentData, DocumentData> =
        collection(db, import.meta.env.VITE_SITE_DB_LOBBY);
      const newLobbyDocRef: DocumentReference<DocumentData, DocumentData> =
        doc(lobbyCollection);

      const newLobbyDataToBE: typeNewLobbyDataToBE = {
        createdBy: authenticateUser!.uid,
        createdAtTimestamp: Timestamp.now(),
        invitedUserUIDs: [],
        gameUID: gameUID,
        name: lobbyName,
        status: "open",
      };

      await setDoc(newLobbyDocRef, newLobbyDataToBE);

      const newLobbyDataToFE: typeNewLobbyDataToFE = {
        lobbyUID: newLobbyDocRef.id,
        ...newLobbyDataToBE,
      };

      setActiveLobbies([...activeLobbies, newLobbyDataToFE]);
      toast("success", "New lobby created successfully!");
    } catch (error) {
      toast("danger", "Error creating lobby.");
      console.error("Error creating new lobby:", error);
    } finally {
      _setIsLobbyCreateLoading(false);
      _setIsModalLobbyCreatedOpenWithGameUID(undefined);
    }
  };

  // ##### FRIENDS LOBBY MANAGER ####
  const handleAddFriendsToCurrentLobby = async (
    gameUID: string,
    lobbyUID: string
  ) => {
    _setCurrentGameUID(gameUID);
    _setCurrentLobbyUID(lobbyUID);
    _setIsModalAddFriendsOpen(true);
  };

  const _handleToggleFriendToCurrentLobby = (userToToggle: typeUserToFE) => {
    if (_currentGameUID && _currentLobbyUID) {
      if (
        friendsAddedToCurrentLobby.some(
          (friend) => friend.userUID === userToToggle.userUID
        )
      ) {
        _setFriendsAddedToCurrentLobby(
          friendsAddedToCurrentLobby.filter(
            (friend) => friend.userUID !== userToToggle.userUID
          )
        );
      } else {
        _setFriendsAddedToCurrentLobby([
          ...friendsAddedToCurrentLobby,
          userToToggle,
        ]);
        _sendLobbyInvitationNotification(
          _currentLobbyUID,
          _currentGameUID,
          userToToggle.userUID
        );
      }
    } else {
      toast("danger", text[l].error);
    }
  };

  const _sendLobbyInvitationNotification = async (
    lobbyUID: string,
    gameUID: string,
    userToInviteUID: string
  ) => {
    try {
      const notificationRef = doc(
        db,
        import.meta.env.VITE_SITE_DB_NOTIFICATIONS,
        userToInviteUID,
        import.meta.env.VITE_SITE_DB_INVITATIONS,
        lobbyUID
      );

      const notificationData: typeNotificationInvitation = {
        lobbyUID: lobbyUID,
        lobbyName: activeLobbies.filter(
          (lobby) => lobby.lobbyUID === lobbyUID
        )[0].name,
        gameUID: gameUID,
        invitedByUserUID: authenticateUser!.uid,
        userEmail: authenticateUser!.email,
        createdAt: Timestamp.now(),
      };

      await setDoc(notificationRef, notificationData);

      const lobbyRef = doc(db, import.meta.env.VITE_SITE_DB_LOBBY, lobbyUID);
      await updateDoc(lobbyRef, {
        invitedUserUIDs: arrayUnion(userToInviteUID),
      });

      // 3. Update the activeLobbies state (optimistic update)
      setActiveLobbies((prevLobbies) => {
        return prevLobbies.map((lobby) => {
          if (lobby.lobbyUID === lobbyUID) {
            return {
              ...lobby,
              invitedUserUIDs: [...lobby.invitedUserUIDs, userToInviteUID],
            };
          }
          return lobby;
        });
      });

      console.log("Invitation notification sent successfully!");
      toast("success", text[l].notification_sent);
    } catch (error) {
      console.error("Error sending invitation notification:", error);
      // Handle the error appropriately, e.g., display a toast message
    }
  };

  const handleDeleteNotification = async (
    notification: typeNotificationInvitation
  ) => {
    try {
      const db = getFirestore();
      const notificationRef = doc(
        db,
        import.meta.env.VITE_SITE_DB_NOTIFICATIONS,
        authenticateUser!.uid, // Make sure authenticateUser is available
        import.meta.env.VITE_SITE_DB_INVITATIONS,
        notification.lobbyUID
      );

      await deleteDoc(notificationRef);

      // Update the notifications state (optimistic update)
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.lobbyUID !== notification.lobbyUID)
      );

      toast("success", "Notification deleted!"); // Or a more specific message
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast("danger", "Error deleting notification."); // Handle the error as needed
    }
  };
  // RETURN ---------------------------------
  return (
    <ContextManagerLobby.Provider
      value={{
        handleCreateNewLobby,
        handleJoinLobby,
        handleLeaveLobby,
        handleAddFriendsToCurrentLobby,
        handleDeleteNotification,
        notifications,
        friendsAddedToCurrentLobby,
        activeLobbies,
        isLobbiesLoading,
      }}
    >
      <>
        {children}
        {/* --------- EXTRA UI ------- */}
        <ModalLobbyCreateNew
          isOpenWithGameUID={_isModalLobbyCreatedOpenWithGameUID}
          onDismiss={() => _setIsModalLobbyCreatedOpenWithGameUID(undefined)}
          callbackCreateNewLobby={_putLobby}
          isLoading={_isLobbyCreateLoading}
        />

        <ModalLobbyAddFriends
          isOpen={_isModalAddFriendsOpen}
          onDismiss={() => {
            _setIsModalAddFriendsOpen(false);
          }}
          callbackToggleFriend={_handleToggleFriendToCurrentLobby}
        />
      </>
    </ContextManagerLobby.Provider>
  );
};
