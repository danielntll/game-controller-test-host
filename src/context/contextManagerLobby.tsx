import React, { useEffect, useState } from "react";
import { useContextLanguage } from "./contextLanguage";
import { useContextToast } from "./systemEvents/contextToast";
import { useAuthContext } from "./auth/contextAuth";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  getFirestore,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import {
  typeNewLobbyDataToBE,
  typeNewLobbyDataToFE,
} from "../types/typeNewLobbyData";
import ModalLobbyCreateNew from "../components/Modal__Lobby__Create__New/ModalLobbyCreateNew";

type contextManagerLobby = {
  handleCreateNewLobby: (gameUID: string) => void;
  handleJoinLobby: (data: any) => void;
  handleLeaveLobby: (data: any) => void;
  activeLobbies: typeNewLobbyDataToFE[];
  isLobbiesLoading: boolean;
};

const ContextManagerLobby = React.createContext<contextManagerLobby>({
  handleCreateNewLobby: () => {},
  handleJoinLobby: () => {},
  handleLeaveLobby: () => {},
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
  // -- Data of new lobby

  // -- Tutte le Lobby Attive
  const [activeLobbies, setActiveLobbies] = useState<typeNewLobbyDataToFE[]>(
    []
  );
  // -- Loading Status All Lobbies
  const [isLobbiesLoading, setIsLobbiesLoading] = useState<boolean>(false);

  // ######### Managing Own Lobby #########

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

  // RETURN ---------------------------------
  return (
    <ContextManagerLobby.Provider
      value={{
        handleCreateNewLobby,
        handleJoinLobby,
        handleLeaveLobby,
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
      </>
    </ContextManagerLobby.Provider>
  );
};
