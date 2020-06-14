import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as authActions from '../../../components/authentication/store/actions/authentication.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(private authService: AuthService, public router: Router, private store: Store<fromRoot.State>) { }

  SignIn(email: string, password: string) {
    this.authService.SignIn(email, password);
  }
  SignUp(email: string, password: string) {
    this.store.dispatch(new authActions.SetRegister({ email, password }));
  }
  ResetPassword(email: string) {
    this.store.dispatch(new authActions.ResetPassword(email));
  }
  signInWithGoogle() {
    this.authService.GoogleAuth();
  }
  ResendVerificationLink() {
    this.authService.SendVerificationMail();
  }
  SignOut() {
    this.authService.SignOut();
  }
  GetAllUsers() {
    return this.authService.GetAllUsers();
  }
  CheckUserEmail(email: string) {
    return this.authService.checkUserEmail(email);
  }
  GetUser() {
    return this.authService.getUser();
  }
}
