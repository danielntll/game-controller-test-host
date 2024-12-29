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
import { constGames } from "../../const/constGames";
import { typeGameDetails } from "../../types/typeGameDetails";
import { route_GameDetails } from "../../routes/singleRoute";
import InvitationsList from "../Game__Lobby/components/InvitationsList/InvitationsList";

interface PageProps {}

const HomePage: React.FC<PageProps> = ({}) => {
  //VARIABLES ------------------------
  const { l } = useContextLanguage();
  const history = useHistory();
  const location = useLocation();
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  const _handleGoToGamePage = (gameUID: string) => {
    history.push(route_GameDetails.pathBase + "/" + gameUID, {
      from: location.pathname,
    });
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
        <>
          <InvitationsList />
          <div className={styles.content + " ion-padding"}>
            {constGames.map((game: typeGameDetails, index: number) => {
              return (
                <CardGame
                  title={game.title[l] ?? ""}
                  subtitle={game.subtitle[l]}
                  description={game.description[l]}
                  imgURL={game.imageURL ?? ""}
                  key={index}
                  callbackOnClick={() => _handleGoToGamePage(game.gameUID)}
                />
              );
            })}
          </div>
        </>
        {/* ----------------- EXTRA UI ----------------------*/}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
