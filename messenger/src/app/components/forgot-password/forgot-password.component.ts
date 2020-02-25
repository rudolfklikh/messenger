import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, useAnimation } from '@angular/animations';
import { wobble, rubberBand, shake, zoomOutRight } from 'ng-animate';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [
    trigger('cancel', [
      transition('void => *', useAnimation(wobble))
    ]),
    trigger('bird', [
      transition('void => *', useAnimation(rubberBand))
    ]),
    trigger('errors', [
      transition('void => *', useAnimation(shake))
    ]),
    trigger('errors_wrapper', [
      transition('* => void', useAnimation(zoomOutRight))
    ])
  ]
})
export class ForgotPasswordComponent implements OnInit {


  public email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);

  constructor(
    public authFacade: AuthFacadeService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer
    ) {
      iconRegistry.addSvgIcon('success', sanitizer.bypassSecurityTrustResourceUrl('assets/success.svg'));
      iconRegistry.addSvgIcon('fail', sanitizer.bypassSecurityTrustResourceUrl('assets/fail.svg'));
  }

  ngOnInit() {
  }

  ResetPassword() {
    this.authFacade.ResetPassword(this.email.value);
  }

}
