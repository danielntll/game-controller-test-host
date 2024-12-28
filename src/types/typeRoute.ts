import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";

export type typeRoute = {
  path: string;
  tab: {
    it_IT: string;
    en_GB: string;
  };
  icons: {
    active: string;
    notActive: string;
  };
  gameDetails?: typeGameDetails;
};

export type typeGameDetails = {
  gameUID: string;
  title: typeAvailableLanguagesModel;
  subtitle: typeAvailableLanguagesModel;
  imageURL: string;
  description: typeAvailableLanguagesModel;
};
