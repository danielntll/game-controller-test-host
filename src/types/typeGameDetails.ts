import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";
import { typeRoute } from "./typeRoute";

export type typeGameDetails = {
  gameUID: string;
  title: typeAvailableLanguagesModel;
  subtitle: typeAvailableLanguagesModel;
  imageURL: string;
  description: typeAvailableLanguagesModel;
  icon: {
    active: string;
    notActive: string;
  };
};
