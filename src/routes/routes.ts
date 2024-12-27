import { typeRoute } from "../types/typeRoute";
import {
  route_GameSpaceShipPage,
  route_HomePage,
  route_ImpostazioniPage,
  route_LoginPage,
  route_RegistrazionePage,
} from "./singleRoute";

export const appRoutes: typeRoute[] = [route_HomePage, route_ImpostazioniPage];

export const allRoutes = {
  route_HomePage,
  route_ImpostazioniPage,
  route_LoginPage,
  route_RegistrazionePage,
  route_GameSpaceShipPage,
};

export const routesServices: typeRoute[] = [
  route_HomePage,
  route_ImpostazioniPage,
];

export const routesGames: typeRoute[] = [route_GameSpaceShipPage];

export const loginRoutes = {
  route_LoginPage,
  route_RegistrazionePage,
};
