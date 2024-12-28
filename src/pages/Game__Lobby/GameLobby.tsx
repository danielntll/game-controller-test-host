import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./GameLobby.module.css";
import { useContext, useEffect, useState } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import { useParams } from "react-router";
import { typeGameDetails } from "../../types/typeGameDetails";
import { constGames } from "../../const/constGames";

interface PageProps {}

const GameLobby: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  const { gameUID, lobbyUID } = useParams<{
    gameUID: string;
    lobbyUID: string;
  }>();
  //USE STATES -----------------------
  const [_thisGame, _setThisGame] = useState<typeGameDetails | null>(null);
  //USE EFFECTS ----------------------
  useEffect(() => {
    if (gameUID) {
      _setThisGame(
        constGames.find((game: typeGameDetails) => game.gameUID === gameUID) ??
          null
      );
    }
  }, [gameUID]);
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={_thisGame?.title[l]} />
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
        <div className={styles.content + " ion-padding"}></div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default GameLobby;
