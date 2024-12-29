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
import { DatabaseReference, ref, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useContextLanguage } from "../../context/contextLanguage";
import Controller from "../../components/Controller/Controller";
import { useAuthContext } from "../../context/auth/contextAuth";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { realtimeDatabase } from "../../firebase/firebaseConfig";
import { useParams } from "react-router";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

interface PageProps {}

const GameSpaceShipGameplayPage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const { auth } = useAuthContext();
  const { gameUID, lobbyUID } = useParams<{
    gameUID: string;
    lobbyUID: string;
  }>();
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
      const __refLocal = ref(
        realtimeDatabase,
        gameUID + "/" + lobbyUID + "/" + auth.currentUser?.uid
      );
      set(__refLocal, { status: "ready" })
        .then(() => console.log("Initial status set to 'ready'"))
        .catch((error) =>
          console.error("Error setting initial status:", error)
        );
      _setGameDbRef(__refLocal);
    }
  }, [gameUID, lobbyUID]);
  useEffect(() => {
    if (_gameDbRef) {
      update(_gameDbRef, {
        joystick: _movement,
        triangle: _triangle,
        square: _square,
        circle: _circle,
        cross: _cross,
      });
    }
  }, [_movement, _triangle, _square, _circle, _cross, _gameDbRef]);
  //FUNCTIONS ------------------------
  const _handleJoystick = async (ev: IJoystickUpdateEvent) => {
    _setMovement(ev);
    await Haptics.impact({ style: ImpactStyle.Light });
  };
  const _handleStopJoystick = async (ev: IJoystickUpdateEvent) => {
    _setMovement(ev);
  };
  const _handleTriangle = async (ev: boolean) => {
    _setTriangle(ev);
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
  const _handleSquare = async (ev: boolean) => {
    _setSquare(ev);
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
  const _handleCircle = async (ev: boolean) => {
    _setCircle(ev);
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
  const _handleCross = async (ev: boolean) => {
    _setCross(ev);
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
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
            callbackEvent={_handleJoystick}
            callbackStopEvent={_handleStopJoystick}
            callbackCircle={_handleCircle}
            callbackCross={_handleCross}
            callbackSquare={_handleSquare}
            callbackTriangle={_handleTriangle}
          />
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default GameSpaceShipGameplayPage;
