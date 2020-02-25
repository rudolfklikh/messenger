import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';
import { wobble, rubberBand, shake, zoomOutRight } from 'ng-animate';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
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
export class SignInComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    public authFacadeService: AuthFacadeService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public fb: FormBuilder
  ) {
    iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg'));
    iconRegistry.addSvgIcon('success', sanitizer.bypassSecurityTrustResourceUrl('assets/success.svg'));
    iconRegistry.addSvgIcon('fail', sanitizer.bypassSecurityTrustResourceUrl('assets/fail.svg'));

    this.loginForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  ngOnInit() {
  }

  SignIn() {
    const userData = this.loginForm.value;
    this.authFacadeService.SignIn(userData.email, userData.password);
  }
  SignInWithGoogle() {
    this.authFacadeService.signInWithGoogle();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
