import { typeAvailableLanguagesModel } from "./typeAvailableLanguage";

export type typeLobbyStatus = "open" | "in_progress" | "finished";

export type typeLobbyStatusValue = {
  status: typeLobbyStatus;
  text: typeAvailableLanguagesModel;
  color: string;
};
