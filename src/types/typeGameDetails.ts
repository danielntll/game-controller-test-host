import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";

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
