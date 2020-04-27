import { status } from 'src/app/components/authentication/store/state/authentication.state';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  status: status;
  timeStamp?: any;
}
