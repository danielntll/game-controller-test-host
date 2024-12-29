import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./GameLobby.module.css";
import { useContext, useEffect, useState } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import { useHistory, useParams } from "react-router";
import { typeGameDetails } from "../../types/typeGameDetails";
import { constGames } from "../../const/constGames";
import FriendsList from "./components/FriendsList/FriendsList";
import { chevronForward } from "ionicons/icons";
import { route_InGame } from "../../routes/singleRoute";

interface PageProps {}

const GameLobby: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const history = useHistory();
  const { gameUID, lobbyUID } = useParams<{
    gameUID: string;
    lobbyUID: string;
  }>();
  //USE STATES -----------------------
  const [_thisGameInfo, _setThisGameInfo] = useState<typeGameDetails | null>(
    null
  );
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (gameUID) {
      _setThisGameInfo(
        constGames.find((game: typeGameDetails) => game.gameUID === gameUID) ??
          null
      );
    }
  }, [gameUID]);
  //FUNCTIONS ------------------------
  const _handleOpenGame = () => {
    history.push(
      route_InGame.getPath!({ gameUID: gameUID, lobbyUID: lobbyUID })
    );
  };
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={_thisGameInfo?.title[l]} />
          </IonButtons>
          <IonTitle>{text[l].pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{text[l].pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content + " ion-padding"}>
          <FriendsList gameUID={gameUID} lobbyUID={lobbyUID} />
          <IonButton
            onClick={() => _handleOpenGame()}
            color={"success"}
            expand="block"
          >
            {text[l].btn__start}
            <IonIcon icon={chevronForward} />
          </IonButton>
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default GameLobby;
