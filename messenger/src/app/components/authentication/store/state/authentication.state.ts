export type status = 'offline' | 'online' | 'away';


export interface AuthUserState {
  isLogged: boolean;
  isLoggining: boolean;
  status: status;
  UID: string;
}

export const initialAuthUserState: AuthUserState = {
  isLogged: false,
  isLoggining: false,
  status: 'offline',
  UID: ''
};



