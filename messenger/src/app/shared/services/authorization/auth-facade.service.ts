import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(private authService: AuthService, public router: Router) { }

  SignIn(email: string, password: string) {
    this.authService.SignIn(email, password);
  }

  signInWithGoogle() {
    this.authService.GoogleAuth();
  }

  SignUp(email: string, password: string) {
    this.authService.SignUp(email, password);
  }
  ResendVerificationLink() {
    this.authService.SendVerificationMail();
  }
  ResetPassword(email: string) {
    this.authService.ForgotPassword(email);
  }

  SignOut() {
    this.authService.SignOut();
  }

  GetAllUsers() {
    return this.authService.GetAllUsers();
  }

}
