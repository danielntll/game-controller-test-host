import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { text } from "./text";

import styles from "./GameSpaceShipPage.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { useState } from "react";
import { useLocation } from "react-router";
import { route_HomePage } from "../../routes/singleRoute";
import { addOutline, qrCodeOutline } from "ionicons/icons";

interface PageProps {}

const GameSpaceShipPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const location: any = useLocation();
  //CONDITIONS -----------------------
  const [_showBackButton, _setShowBackButton] = useState<boolean>(false);
  const [_activeRooms, _setActiveRooms] = useState<any[]>([]);
  const [_invites, _setInvites] = useState<any[]>([]);
  //USEEFFECTS -----------------------
  useIonViewWillEnter(() => {
    if (location.state && location.state.from === route_HomePage.path) {
      _setShowBackButton(true);
    }
  }, [location.state]);
  //FUNCTIONS ------------------------
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
          <IonTitle>{route_HomePage.tab[l]}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.content}>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content + " ion-padding"}>
          <>
            <IonButton expand="block">
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
          <IonList>
            <IonListHeader>{text[l].activeRooms}</IonListHeader>
            {_activeRooms.map((room) => (
              <IonItem key={room.id} routerLink={`/game/${room.id}`}>
                <IonLabel>{room.name}</IonLabel>
              </IonItem>
            ))}
            {_activeRooms.length === 0 && (
              <IonLabel>
                <p className="ion-padding">{text[l].noActiveRooms}</p>
              </IonLabel>
            )}
          </IonList>
          <IonList>
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
          </IonList>
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default GameSpaceShipPage;
