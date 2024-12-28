import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { text } from "./text";

import styles from "./HomePage.module.css";
import { useContext } from "react";
import {
  ContextLanguage,
  useContextLanguage,
} from "../../context/contextLanguage";
import { routesGames } from "../../routes/routes";
import { typeRoute } from "../../types/typeRoute";
import CardGame from "../../components/Card__Game/CardGame";
import { useHistory, useLocation } from "react-router";

interface PageProps {}

const HomePage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const history = useHistory();
  const location = useLocation();
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  const _handleGoToGamePage = (path: string) => {
    history.push(path, { from: location.pathname });
  };
  //RETURN COMPONENT -----------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
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
          {routesGames.map((game: typeRoute, index: number) => {
            return (
              <CardGame
                title={game.gameDetails?.title[l] ?? ""}
                subtitle={game.gameDetails?.subtitle[l]}
                description={game.gameDetails?.description[l]}
                imgURL={game.gameDetails?.imageURL ?? ""}
                key={index}
                callbackOnClick={() => _handleGoToGamePage(game.path)}
              />
            );
          })}
        </div>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
