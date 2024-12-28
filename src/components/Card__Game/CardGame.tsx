import styles from "./CardGame.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

interface ContainerProps {
  title: string;
  subtitle: string;
  imgURL: string;
  description: string;
  callbackOnClick: () => void;
}

const CardGame: React.FC<ContainerProps> = ({
  title,
  subtitle,
  imgURL,
  description,
  callbackOnClick,
}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonCard className={styles.card} onClick={callbackOnClick}>
      <img src={imgURL} alt={title} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{description}</IonCardContent>
    </IonCard>
  );
};

export default CardGame;
