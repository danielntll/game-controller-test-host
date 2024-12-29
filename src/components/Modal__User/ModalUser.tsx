import styles from "./ModalUser.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { typeUserToFE } from "../../types/typeUser";
import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ModalUserContent from "./ModalUserContent";

interface ContainerProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  user?: typeUserToFE;
  canModify: boolean;
  onSave?: (updatedUser: typeUserToFE) => void;
}

const ModalUser: React.FC<ContainerProps> = ({
  user,
  isModalOpen,
  setIsModalOpen,
  canModify,
  onSave,
}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  const [_user, _setUser] = useState<typeUserToFE | undefined>(user);
  const [_isModifying, _setIsModifying] = useState<boolean>(false);

  //USE EFFECTS ----------------------
  useEffect(() => {
    if (user) {
      _setUser(user);
    }
  }, [user, isModalOpen]);

  //FUNCTIONS ------------------------
  const _handleInputChange = (
    key: keyof typeUserToFE,
    value: string | undefined
  ) => {
    if (!_user || !canModify) return;
    _setUser({ ..._user, [key]: value });
  };

  const _handleSave = () => {
    if (_user && onSave) {
      onSave(_user);
    }
    setIsModalOpen(false);
  };

  //RETURN COMPONENT -----------------
  return (
    <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color={"medium"} onClick={() => setIsModalOpen(false)}>
              {text[l].btn__close}
            </IonButton>
          </IonButtons>
          <IonTitle>{text[l].title}</IonTitle>
          {/* <IonButtons slot="start">
            <IonButton color={"primary"} onClick={() => setIsModalOpen(false)}>
              {text[l].btn__modify}
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {_user && !_isModifying && <ModalUserContent user={_user} />}
      </IonContent>
    </IonModal>
  );
};

export default ModalUser;
