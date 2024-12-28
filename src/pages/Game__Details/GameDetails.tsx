import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { text } from "./text";

import styles from "./GameDetails.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { route_HomePage } from "../../routes/singleRoute";
import { addOutline, qrCodeOutline } from "ionicons/icons";
import { typeGameDetails } from "../../types/typeGameDetails";
import { constGames } from "../../const/constGames";
import { useContextManagerLobby } from "../../context/contextManagerLobby";
import ActiveLobbies from "./components/ActiveLobbies/ActiveLobbies";

interface PageProps {}

const GameDetails: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { gameUID } = useParams<{ gameUID: string }>();
  const { handleCreateNewLobby } = useContextManagerLobby();
  const _location: any = useLocation();
  //USE STATES -----------------------
  const [_showBackButton, _setShowBackButton] = useState<boolean>(false);
  const [_thisGame, _setThisGame] = useState<typeGameDetails | null>(null);
  //USE EFFECTS ----------------------
  useIonViewWillEnter(() => {
    if (_location.state && _location.state.from === route_HomePage.path) {
      _setShowBackButton(true);
    }
  }, [_location.state]);

  useEffect(() => {
    if (gameUID) {
      _setThisGame(
        constGames.find((game: typeGameDetails) => game.gameUID === gameUID) ??
          null
      );
    }
  }, [gameUID]);
  //FUNCTIONS ------------------------
  const _handleCreateRoom = () => {
    handleCreateNewLobby(gameUID);
  };
  const _handleJoinRoom = () => {};
  //RETURN COMPONENT -----------------
  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {_showBackButton ? (
              <IonBackButton
                text={route_HomePage.tab[l]}
                defaultHref={route_HomePage.path}
              />
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>
          <IonTitle>{_thisGame?.title[l]}</IonTitle>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.content}>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content + " ion-padding"}>
          <>
            <IonButton expand="block" onClick={() => _handleCreateRoom()}>
              {text[l].createRoom}
              <IonIcon className="ion-margin-start" icon={addOutline} />
            </IonButton>
            <IonLabel>
              <p className="ion-padding">{text[l].createRoom_label}</p>
            </IonLabel>
          </>
          <>
            <IonButton expand="block">
              {text[l].joinWithQrCode}
              <IonIcon className="ion-margin-start" icon={qrCodeOutline} />
            </IonButton>
            <IonLabel>
              <p className="ion-padding">{text[l].joinWithQrCode_label}</p>
            </IonLabel>
          </>
          <ActiveLobbies gameUID={gameUID} />
          {/* <IonList>
            <IonListHeader>{text[l].invites}</IonListHeader>
            {_invites.map((room) => (
              <IonItem key={room.id} routerLink={`/game/${room.id}`}>
                <IonLabel>{room.name}</IonLabel>
              </IonItem>
            ))}
            {_invites.length === 0 && (
              <IonLabel>
                <p className="ion-padding">{text[l].noInvites}</p>
              </IonLabel>
            )}
          </IonList> */}
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default GameDetails;
