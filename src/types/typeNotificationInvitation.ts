import { Timestamp } from "firebase/firestore";

export type typeNotificationInvitation = {
  lobbyUID: string;
  lobbyName: string;
  gameUID: string;
  invitedByUserUID: string;
  userEmail: string | null | undefined; // Account for potential null values
  createdAt: Timestamp;
};
