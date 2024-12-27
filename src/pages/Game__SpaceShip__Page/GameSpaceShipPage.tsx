import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./GameSpaceShipPage.module.css";
import { useContext, useState } from "react";
import { ContextLanguage } from "../../context/contextLanguage";
import Controller from "../../components/Controller/Controller";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

interface PageProps {}

const GameSpaceShipPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  const [_movement, _setMovement] = useState<IJoystickUpdateEvent | null>(null);
  const [_triangle, _setTriangle] = useState<boolean>(false);
  const [_square, _setSquare] = useState<boolean>(false);
  const [_circle, _setCircle] = useState<boolean>(false);
  const [_cross, _setCross] = useState<boolean>(false);
  //FUNCTIONS ------------------------

  //RETURN COMPONENT -----------------
  return (
    <IonPage className={styles.page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{text[l].pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.content}>
        {/* ----------------- PAGE CONTENT ------------------*/}
        <div className={styles.content + " ion-padding"}>
          <Controller
            callbackEvent={_setMovement}
            callbackStopEvent={_setMovement}
            callbackCircle={_setCircle}
            callbackCross={_setCross}
            callbackSquare={_setSquare}
            callbackTriangle={_setTriangle}
          />
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default GameSpaceShipPage;
