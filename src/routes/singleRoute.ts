import {
  home,
  homeOutline,
  logIn,
  logInOutline,
  personAdd,
  personAddOutline,
  rocket,
  rocketOutline,
  settings,
  settingsOutline,
} from "ionicons/icons";
import { typeRoute } from "../types/typeRoute";

// GAMES -----------------
export const route_InGame: typeRoute<"/game/:gameUID/lobby/:lobbyUID/ingame"> =
  {
    getPath: (params) =>
      `/game/${params.gameUID}/lobby/${params.lobbyUID}/ingame`,
    path: "/game/:gameUID/lobby/:lobbyUID/ingame",
    pathBase: "/game",
    tab: {
      it_IT: "",
      en_GB: "",
    },
    icons: {
      active: "",
      notActive: "",
    },
  };
export const route_GameLobby: typeRoute<"/games/:gameUID/lobby/:lobbyUID"> = {
  getPath: (params) => `/games/${params.gameUID}/lobby/${params.lobbyUID}`,
  path: "/games/:gameUID/lobby/:lobbyUID",
  pathBase: "/games",
  tab: {
    it_IT: "",
    en_GB: "",
  },
  icons: {
    active: "",
    notActive: "",
  },
};
export const route_GameDetails: typeRoute = {
  path: "/games/:gameUID",
  pathBase: "/games",
  tab: {
    it_IT: "",
    en_GB: "",
  },
  icons: {
    active: "",
    notActive: "",
  },
};

export const route_GameSpaceShipPage: typeRoute = {
  path: "/games/spaceship",
  tab: {
    it_IT: "Spaceship",
    en_GB: "Spaceship",
  },
  icons: {
    active: rocket,
    notActive: rocketOutline,
  },
};

// SERVICES --------------
export const route_HomePage: typeRoute = {
  path: "/home",
  tab: {
    it_IT: "Home",
    en_GB: "Home",
  },
  icons: {
    active: home,
    notActive: homeOutline,
  },
};
export const route_ImpostazioniPage: typeRoute = {
  path: "/impostazioni",
  tab: {
    it_IT: "Impostazioni",
    en_GB: "Settings",
  },
  icons: {
    active: settings,
    notActive: settingsOutline,
  },
};

// AUTH -----------------
// Login
export const route_LoginPage: typeRoute = {
  path: "/login",
  tab: {
    it_IT: "Accesso",
    en_GB: "Login",
  },
  icons: {
    active: logIn,
    notActive: logInOutline,
  },
};
// Registrazione
export const route_RegistrazionePage: typeRoute = {
  path: "/registrazione",
  tab: {
    it_IT: "Register",
    en_GB: "Registrazione",
  },
  icons: {
    active: personAdd,
    notActive: personAddOutline,
  },
};
