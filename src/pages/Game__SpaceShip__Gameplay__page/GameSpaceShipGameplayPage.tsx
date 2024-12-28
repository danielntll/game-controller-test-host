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

import styles from "./GameSpaceShipGameplayPage.module.css";
import { DatabaseReference, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useContextLanguage } from "../../context/contextLanguage";
import Controller from "../../components/Controller/Controller";
import { useAuthContext } from "../../context/auth/contextAuth";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { realtimeDatabase } from "../../firebase/firebaseConfig";
import { route_GameSpaceShipPage } from "../../routes/singleRoute";

interface PageProps {}

const GameSpaceShipGameplayPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { auth } = useAuthContext();
  //CONDITIONS -----------------------
  const [_gameDbRef, _setGameDbRef] = useState<DatabaseReference | null>(null);
  const [_movement, _setMovement] = useState<IJoystickUpdateEvent | null>(null);
  const [_triangle, _setTriangle] = useState<boolean>(false);
  const [_square, _setSquare] = useState<boolean>(false);
  const [_circle, _setCircle] = useState<boolean>(false);
  const [_cross, _setCross] = useState<boolean>(false);
  //USEEFFECTS -----------------------
  useEffect(() => {
    if (!_gameDbRef) {
      // _setGameDbRef(
      //   ref(
      //     realtimeDatabase,
      //     route_GameSpaceShipPage.gameDetails?.gameUID +
      //       "/" +
      //       auth.currentUser?.uid
      //   )
      // );
    }
  }, []);
  useEffect(() => {}, [_movement, _triangle, _square, _circle, _cross]);
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
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

export default GameSpaceShipGameplayPage;
