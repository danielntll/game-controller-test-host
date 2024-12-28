import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";

export type typeRoute = {
  path: string;
  pathBase?: string;
  tab: typeAvailableLanguagesModel;
  icons: {
    active: string;
    notActive: string;
  };
};
