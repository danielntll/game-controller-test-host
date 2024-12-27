import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Button__Menu.css";
import { useAuthContext } from "../../context/auth/contextAuth";
import { text } from "./text";
import { useContextLanguage } from "../../context/contextLanguage";
import { routesGames, routesServices } from "../../routes/routes";
import { typeRoute } from "../../types/typeRoute";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Inbox",
    url: "/folder/Inbox",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const ButtonMenu: React.FC = () => {
  const location = useLocation();
  const { auth } = useAuthContext();
  const { l } = useContextLanguage();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Client</IonListHeader>
          <IonNote>{auth.currentUser?.email}</IonNote>
          {routesServices.map((page: typeRoute, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === page.path ? "selected" : ""}
                  routerLink={page.path}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    color={
                      location.pathname === page.path ? "primary" : "medium"
                    }
                    icon={
                      location.pathname === page.path
                        ? page.icons.active
                        : page.icons.notActive
                    }
                  />
                  <IonLabel>{page.tab[l]}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="inbox-list">
          <IonListHeader>{text[l].labels}</IonListHeader>
          {routesGames.map((page: typeRoute, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === page.path ? "selected" : ""}
                  routerLink={page.path}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    color={
                      location.pathname === page.path ? "primary" : "medium"
                    }
                    icon={
                      location.pathname === page.path
                        ? page.icons.active
                        : page.icons.notActive
                    }
                  />
                  <IonLabel>{page.tab[l]}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default ButtonMenu;
