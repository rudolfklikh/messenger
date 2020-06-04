import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authFacade: AuthFacadeService, private snackBar: MatSnackBar) { }
  userEmail: string;
  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
  }

  resendVerificationLink() {
    this.authFacade.ResendVerificationLink();
    this.snackBar.open(`Check your email again ${this.userEmail}`, `Close`, {
      duration: 5000
    });
  }

}
