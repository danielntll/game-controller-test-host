import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { useContextLanguage } from "../../../../context/contextLanguage";
import styles from "./InvitationsList.module.css";
import { text } from "./text";
import { useContextManagerLobby } from "../../../../context/lobby/contextManagerLobby";
import { useHistory } from "react-router";
import { typeNotificationInvitation } from "../../../../types/typeNotificationInvitation";
import { route_GameLobby } from "../../../../routes/singleRoute";

interface ContainerProps {}

const InvitationsList: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { notifications, handleDeleteNotification } = useContextManagerLobby();
  const history = useHistory();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  const _handleOpenLobby = (notification: typeNotificationInvitation) => {
    history.push(
      route_GameLobby.getPath!({
        gameUID: notification.gameUID,
        lobbyUID: notification.lobbyUID,
      })
    );
  };
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonListHeader>
        <IonLabel>{text[l].componentTitle}</IonLabel>
      </IonListHeader>
      {notifications.map(
        (notification: typeNotificationInvitation, index: number) => (
          <IonItem
            key={index + notification.lobbyUID}
            button
            onClick={() => _handleOpenLobby(notification)}
          >
            <IonLabel>
              <h3>{notification.lobbyName}</h3>
            </IonLabel>
          </IonItem>
        )
      )}
    </IonList>
  );
};

export default InvitationsList;
