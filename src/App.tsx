import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Button__Menu/Button__Menu";

import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { ProviderContextLanguage } from "./context/contextLanguage";
import { AuthContextProvider } from "./context/auth/contextAuth";
import RegistrazionePage from "./pages/Registrazione_Page/RegistrazionePage";
import { loginRoutes } from "./routes/routes";
import {
  route_GameDetails,
  route_GameLobby,
  route_HomePage,
  route_ImpostazioniPage,
  route_LoginPage,
  route_RegistrazionePage,
} from "./routes/singleRoute";
import LoginPage from "./pages/Login_Page/LoginPage";
import HomePage from "./pages/Home_Page/HomePage";
import ImpostazioniPage from "./pages/Impostazioni/ImpostazioniPage";
import GameDetails from "./pages/Game__Details/GameDetails";
import { ProviderContextToast } from "./context/systemEvents/contextToast";
import GameLobby from "./pages/Game__Lobby/GameLobby";

setupIonicReact({
  rippleEffect: false,
  mode: "ios",
});

const App: React.FC = () => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonApp>
      <IonReactRouter>
        <ProviderContextLanguage>
          <ProviderContextToast>
            <AuthContextProvider />
          </ProviderContextToast>
        </ProviderContextLanguage>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

export const authenticatedRoutesOutlet = () => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        {/* --------------------------- GAMES --------------------- */}
        <Route exact path={route_GameDetails.path}>
          <GameDetails />
        </Route>
        <Route exact path={route_GameLobby.path}>
          <GameLobby />
        </Route>
        {/* <Route exact path={route_GameSpaceShipPage.path}>
          <GameSpaceShipPage />
        </Route> */}

        {/* --------------------------- SERIVES --------------------- */}
        {/* ---- Home ---- */}
        <Route exact path={route_HomePage.path}>
          <HomePage />
        </Route>
        {/* ---- Impostazioni ---- */}
        <Route exact path={route_ImpostazioniPage.path}>
          <ImpostazioniPage />
        </Route>

        {/* --------- REDIRECT --------- */}
        <Route exact path="/">
          <Redirect to={route_HomePage.path} />
        </Route>
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export const loginRoutesOutlet = () => {
  //VARIABLES ------------------------
  //CONDITIONS -----------------------
  //FUNCTIONS ------------------------
  //RETURN COMPONENT -----------------
  return (
    <IonRouterOutlet>
      {/* --------- REDIRECT --------- */}
      <Route exact path="/">
        <Redirect to={loginRoutes.route_LoginPage.path} />
      </Route>

      {/* --------- ROUTES ----------- */}
      {/* ---- Login ---- */}
      <Route exact path={route_LoginPage.path}>
        <LoginPage />
      </Route>
      {/* ---- Login ---- */}
      <Route exact path={route_RegistrazionePage.path}>
        <RegistrazionePage />
      </Route>
    </IonRouterOutlet>
  );
};
