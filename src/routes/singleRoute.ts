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
  gameDetails: {
    gameUID: "spaceship",
    title: {
      it_IT: "SpaceShip",
      en_GB: "SpaceShip",
    },
    subtitle: {
      it_IT: "Salva lo spazio",
      en_GB: "Save the space",
    },
    imageURL:
      "https://cdn.pixabay.com/photo/2012/11/28/11/28/rocket-launch-67723_1280.jpg",
    description: {
      it_IT: "Prova a salvare lo spazio dagli asteroidi",
      en_GB: "Try to save the space from asteroids",
    },
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
