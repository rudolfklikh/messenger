import { status } from 'src/app/components/authentication/store/state/authentication.state';

export interface AuthState {
  status: string;
  UID: string;
}
