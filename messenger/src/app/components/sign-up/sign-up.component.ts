import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';
import { wobble, rubberBand, shake, zoomOutRight } from 'ng-animate';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(
    private authFacadeService: AuthFacadeService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public fb: FormBuilder) {
    iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg'));
    iconRegistry.addSvgIcon('success', sanitizer.bypassSecurityTrustResourceUrl('assets/success.svg'));
    iconRegistry.addSvgIcon('fail', sanitizer.bypassSecurityTrustResourceUrl('assets/fail.svg'));

    this.registrationForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(8)]
      ]
    });
  }

  SignUp() {
    const userData = this.registrationForm.value;
    this.authFacadeService.SignUp(userData.email, userData.password);
  }

  SignUpWithGoogle() {
    this.authFacadeService.signInWithGoogle();
  }

  ngOnInit() {
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
}
