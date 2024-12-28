import { typeLobbyStatusValue } from "../types/typeLobbyStatus";

export const constLobbyStatus: typeLobbyStatusValue[] = [
  {
    status: "open",
    text: {
      it_IT: "Aperta",
      en_GB: "Open",
    },
    color: "success",
  },
  {
    status: "in_progress",
    text: {
      it_IT: "In corso",
      en_GB: "In progress",
    },
    color: "warning",
  },
  {
    status: "finished",
    text: {
      it_IT: "Terminata",
      en_GB: "Finished",
    },
    color: "danger",
  },
];
