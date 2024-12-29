import {
  IonBadge,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { useContextLanguage } from "../../../../context/contextLanguage";
import styles from "./ActiveLobbies.module.css";
import { text } from "./text";
import { typeNewLobbyDataToFE } from "../../../../types/typeNewLobbyData";
import { useContextManagerLobby } from "../../../../context/lobby/contextManagerLobby";
import { constLobbyStatus } from "../../../../const/constLobbyStatus";
import { typeLobbyStatusValue } from "../../../../types/typeLobbyStatus";
import { constGames } from "../../../../const/constGames";
import { typeGameDetails } from "../../../../types/typeGameDetails";
import { route_GameLobby } from "../../../../routes/singleRoute";
import { useAuthContext } from "../../../../context/auth/contextAuth";

interface ContainerProps {
  gameUID: string;
}

const ActiveLobbies: React.FC<ContainerProps> = ({ gameUID }) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { activeLobbies } = useContextManagerLobby();
  const { auth } = useAuthContext();
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  const _filteredLobbies: typeNewLobbyDataToFE[] = activeLobbies.filter(
    (lobby) => lobby.gameUID === gameUID
  );

  const _game: typeGameDetails | undefined = constGames.find(
    (game: typeGameDetails) => game.gameUID === gameUID
  );
  //RETURN COMPONENT -----------------
  return (
    <IonList inset>
      <IonListHeader>
        <p>{text[l].componentTitle}</p>
      </IonListHeader>
      {_filteredLobbies.map((lobby: typeNewLobbyDataToFE, index: number) => {
        //VARIABLES ------------------------
        const lobbyStatus: typeLobbyStatusValue = constLobbyStatus.filter(
          (status: typeLobbyStatusValue) => status.status === lobby.status
        )[0];
        //RETURN COMPONENT -----------------
        return (
          <IonItem
            button
            key={lobby.lobbyUID + index}
            routerLink={route_GameLobby.getPath!({
              gameUID: gameUID,
              lobbyUID: lobby.lobbyUID,
            })}
          >
            <IonLabel>
              <IonBadge color={lobbyStatus.color}>
                {lobbyStatus.text[l]}
              </IonBadge>
              <h3>{lobby.name}</h3>
              <p>
                {lobby.createdAtTimestamp &&
                  new Date(
                    lobby.createdAtTimestamp.toDate().getTime()
                  ).toLocaleDateString()}
              </p>
            </IonLabel>
            {lobby.createdBy === auth.currentUser?.uid && (
              <IonBadge color={"primary"}>{text[l].creator}</IonBadge>
            )}
          </IonItem>
        );
      })}
      {_filteredLobbies.length === 0 && (
        <IonLabel>
          <p className="ion-padding">{text[l].noLobbies}</p>
        </IonLabel>
      )}
    </IonList>
  );
};

export default ActiveLobbies;
