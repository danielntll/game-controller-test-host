import styles from "./DemoComponent.module.css";
import { useContextLanguage } from "../../context/contextLanguage";
import { text } from "./text";

interface ContainerProps {}

const DemoComponent: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className={styles.container}>
      <p>{text[l].componentTitle}</p>
    </div>
  );
};

export default DemoComponent;
