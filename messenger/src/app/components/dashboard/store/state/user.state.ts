export interface UserState {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  about?: string;
}

export const InitialUserState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  emailVerified: null,
  about: null
};
