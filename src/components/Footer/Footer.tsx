import { useContext } from "react";
import styles from "./Footer.module.css";
import { text } from "./text";
import {
  LINK_FACEBOOK,
  LINK_INSTAGRAM,
  LINK_SUPPORT,
  LINK_TERMNS_POLICY,
  LINK_WEBSITE,
} from "../../utils/links";
import { IonIcon } from "@ionic/react";
import { globeOutline, logoFacebook, logoInstagram } from "ionicons/icons";
import { ContextLanguage } from "../../context/contextLanguage";

interface ContainerProps {}

const Footer: React.FC<ContainerProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContext(ContextLanguage);
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <div className="ion-padding">
      <hr className={styles.hr + " " + "ion-padding"} />
      <div className={styles.socialContainer}>
        <span className={styles.seguici}>{text[l].seguici}</span>
        <div className={styles.socialsRow}>
          <IonIcon
            className={styles.socialIcon}
            onClick={() => {
              window.open(LINK_INSTAGRAM, "_blank");
            }}
            size="large"
            icon={logoInstagram}
            color={"primary"}
          />
          <IonIcon
            className={styles.socialIcon}
            onClick={() => {
              window.open(LINK_FACEBOOK, "_blank");
            }}
            size="large"
            icon={logoFacebook}
            color={"primary"}
          />
          <IonIcon
            className={styles.socialIcon}
            onClick={() => {
              window.open(LINK_WEBSITE, "_blank");
            }}
            size="large"
            icon={globeOutline}
            color={"primary"}
          />
        </div>
      </div>
      <div className={styles.links + " ion-padding"}>
        <a href={LINK_TERMNS_POLICY} target="_blank">
          <span className={styles.policy}>{text[l].btn__user_policy}</span>
        </a>
        <a href={LINK_SUPPORT} target="_blank">
          <span className={styles.policy}>{text[l].btn_support}</span>
        </a>
      </div>

      <div className="ion-padding">
        <span className={styles.diritti}>{text[l].diritti}</span>
      </div>
    </div>
  );
};

export default Footer;
