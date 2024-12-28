export interface typeUserToBE {
  email: string;
  username: string;
  cratedAtTimestamp: any;
  imageURL?: string;
}

export interface typeUserToFE extends typeUserToBE {
  userUID: string;
}
