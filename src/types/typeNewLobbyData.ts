import { typeLobbyStatus } from "./typeLobbyStatus";

export interface typeNewLobbyDataToBE {
  createdBy: string;
  createdAtTimestamp: any;
  invitedUserUIDs: string[];
  gameUID: string;
  name: string;
  status: typeLobbyStatus;
}

export interface typeNewLobbyDataToFE extends typeNewLobbyDataToBE {
  lobbyUID: string;
}
