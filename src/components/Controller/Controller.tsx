import { IonButton, IonIcon } from "@ionic/react";
import styles from "./Controller.module.css";
import { text } from "./text";
import { Joystick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import {
  closeOutline,
  ellipseOutline,
  squareOutline,
  triangleOutline,
} from "ionicons/icons";

interface ContainerProps {
  callbackEvent: (data: IJoystickUpdateEvent) => void;
  callbackStopEvent: (data: IJoystickUpdateEvent) => void;
  callbackTriangle: (isPressed: boolean) => void;
  callbackSquare: (isPressed: boolean) => void;
  callbackCircle: (isPressed: boolean) => void;
  callbackCross: (isPressed: boolean) => void;
}

const Controller: React.FC<ContainerProps> = ({
  callbackEvent,
  callbackStopEvent,
  callbackTriangle,
  callbackSquare,
  callbackCircle,
  callbackCross,
}) => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <div className={styles.sx}>
        <Joystick
          size={100}
          sticky={false}
          baseColor="red"
          stickColor="blue"
          move={(e) => {
            callbackEvent(e);
          }}
          stop={(e) => {
            callbackStopEvent(e);
          }}
        ></Joystick>
      </div>
      <div className={styles.dx}>
        <div className={styles.singleElem}>
          <IonButton
            onMouseDown={() => callbackTriangle(true)}
            onMouseUp={() => callbackTriangle(false)}
            onTouchStart={() => callbackTriangle(true)}
            onTouchEnd={() => callbackTriangle(false)}
          >
            <IonIcon icon={triangleOutline} />
          </IonButton>
        </div>
        <div className={styles.twoElem}>
          <IonButton
            onMouseDown={() => callbackSquare(true)}
            onMouseUp={() => callbackSquare(false)}
            onTouchStart={() => callbackSquare(true)}
            onTouchEnd={() => callbackSquare(false)}
          >
            <IonIcon icon={squareOutline} />
          </IonButton>
          <IonButton
            onMouseDown={() => callbackCircle(true)}
            onMouseUp={() => callbackCircle(false)}
            onTouchStart={() => callbackCircle(true)}
            onTouchEnd={() => callbackCircle(false)}
          >
            <IonIcon icon={ellipseOutline} />
          </IonButton>
        </div>
        <div className={styles.singleElem}>
          <IonButton
            onMouseDown={() => callbackCross(true)}
            onMouseUp={() => callbackCross(false)}
            onTouchStart={() => callbackCross(true)}
            onTouchEnd={() => callbackCross(false)}
          >
            <IonIcon icon={closeOutline} />
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default Controller;
