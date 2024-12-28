import { useContextLanguage } from "../../../../context/contextLanguage";
import styles from "./FriendsList.module.css";
import { text } from "./text";

interface ContainerProps {}

const FriendsList: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //USE STATES -----------------------
  //USE EFFECTS ----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <p>{text[l].componentTitle}</p>
    </div>
  );
};

export default FriendsList;
