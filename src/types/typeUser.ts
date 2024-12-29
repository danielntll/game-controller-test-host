export interface typeUserToBE {
  email: string;
  cratedAtTimestamp: any;
}

export interface typeUserToFE extends typeUserToBE {
  userUID: string;
}
