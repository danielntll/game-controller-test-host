import styles from "./ModalLobbyCreateNew.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronForward } from "ionicons/icons";
import { useState } from "react";

interface ContainerProps {
  isOpenWithGameUID?: string;
  onDismiss: () => void;
  isLoading: boolean;
  callbackCreateNewLobby: (gameUID: string, lobbyName: string) => void;
}

const ModalLobbyCreateNew: React.FC<ContainerProps> = ({
  isOpenWithGameUID,
  onDismiss,
  isLoading,
  callbackCreateNewLobby,
}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //CONDITIONS -----------------------
  const [lobbyName, setLobbyName] = useState<string>("");
  //FUNCTIONS ------------------------
  const _handleEnterLobby = () => {
    if (isOpenWithGameUID) {
      callbackCreateNewLobby(isOpenWithGameUID, lobbyName);
      setLobbyName("");
    }
  };
  //RETURN COMPONENT -----------------
  return (
    <IonModal
      isOpen={isOpenWithGameUID !== undefined}
      onDidDismiss={() => {
        setLobbyName("");
        onDismiss();
      }}
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 1]}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{text[l].modalTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading ? (
          <IonSpinner />
        ) : (
          <>
            <IonList inset>
              <IonItem>
                <IonInput
                  label={text[l].lobbyName}
                  labelPlacement="floating"
                  value={lobbyName}
                  onInput={(e) =>
                    setLobbyName(e.currentTarget.value?.toString() ?? "")
                  }
                />
              </IonItem>
            </IonList>
            <IonLabel>
              <p className="ion-padding-horizontal">
                {text[l].lobbyName_label}
              </p>
            </IonLabel>
            <div className="ion-padding">
              <IonButton
                className="ion-margin-top"
                expand="block"
                color={"success"}
                onClick={_handleEnterLobby}
                disabled={!lobbyName}
              >
                {text[l].createGame}
                <IonIcon className="ion-margin-start" icon={chevronForward} />
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

export default ModalLobbyCreateNew;
