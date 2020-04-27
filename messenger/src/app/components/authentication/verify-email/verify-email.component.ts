import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authFacade: AuthFacadeService) { }
  userEmail: string;
  ngOnInit() {
    this.userEmail = JSON.parse(localStorage.getItem('user')).email;
  }

  resendVerificationLink() {
    this.authFacade.ResendVerificationLink();
  }

}
