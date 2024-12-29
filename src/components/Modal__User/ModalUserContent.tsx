import styles from "./ModalUser.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import { typeUserToFE } from "../../types/typeUser";
import { IonItem, IonLabel, IonList } from "@ionic/react";

interface ContainerProps {
  user: typeUserToFE;
}

const ModalUserContent: React.FC<ContainerProps> = ({ user }) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      {/* <div className={styles.imageContainer}>
        <img className={styles.image} src={user.imageURL} alt="Avatar User" />
      </div> */}
      <IonList inset>
        {/* <IonItem>
          <IonLabel>
            <p>{text[l].username__label}</p>
            <h3>{user.username}</h3>
          </IonLabel>
        </IonItem> */}
        <IonItem>
          <IonLabel>
            <p>{text[l].email__label}</p>
            <h3>{user.email}</h3>
          </IonLabel>
        </IonItem>
      </IonList>
    </div>
  );
};

export default ModalUserContent;
