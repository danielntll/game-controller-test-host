import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { useContextLanguage } from "../../../../context/contextLanguage";
import styles from "./FriendsList.module.css";
import { text } from "./text";
import { useContextManagerLobby } from "../../../../context/lobby/contextManagerLobby";
import { addOutline } from "ionicons/icons";
import { typeUserToFE } from "../../../../types/typeUser";

interface ContainerProps {
  gameUID: string;
  lobbyUID: string;
}

const FriendsList: React.FC<ContainerProps> = ({ gameUID, lobbyUID }) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { handleAddFriendsToCurrentLobby, friendsAddedToCurrentLobby } =
    useContextManagerLobby();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonListHeader>
        <IonLabel>{text[l].componentTitle}</IonLabel>
        <IonButton
          onClick={() => handleAddFriendsToCurrentLobby(gameUID, lobbyUID)}
        >
          {text[l].btn__add}
          <IonIcon className="ion-margin-start" icon={addOutline} />
        </IonButton>
      </IonListHeader>
      {friendsAddedToCurrentLobby.length === 0 ? (
        <IonLabel>
          <p className="ion-padding">{text[l].noFriendsAdded}</p>
        </IonLabel>
      ) : (
        friendsAddedToCurrentLobby.map((user: typeUserToFE, index: number) => {
          return (
            <IonItem key={index + user.userUID}>
              <IonLabel>
                <h3>{user.email}</h3>
              </IonLabel>
            </IonItem>
          );
        })
      )}
    </IonList>
  );
};

export default FriendsList;
