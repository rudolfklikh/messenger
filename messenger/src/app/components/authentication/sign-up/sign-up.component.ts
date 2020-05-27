import { Component, OnInit, OnChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';
import { wobble, rubberBand, shake, zoomOutRight, fadeInLeft, fadeOutLeft, fadeOut, bounceOut, bounceOutLeft } from 'ng-animate';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { SignUpValidators } from 'src/app/shared/validators/sign-up/sign-up-validators';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';

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
    ]),
    trigger('difficulty', [
      transition('void => *', useAnimation(fadeInLeft, {
        params: {
          timing: 0.7
        }
      })),
      transition('* => void', useAnimation(bounceOutLeft, {
        params: {
          timing: 0.7
        }
      })),
    ])
  ]
})
export class SignUpComponent implements OnInit, OnChanges {

  public registrationForm: FormGroup;
  public color: ThemePalette = 'accent';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 20;
  public difficulty = '';
  public isLoaded$: Observable<boolean>;

  constructor(
    private authFacadeService: AuthFacadeService,
    private utils: UtilsService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    public fb: FormBuilder,
    private store: Store<fromRoot.State>) {
    iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('assets/google.svg'));
    iconRegistry.addSvgIcon('success', sanitizer.bypassSecurityTrustResourceUrl('assets/success.svg'));
    iconRegistry.addSvgIcon('fail', sanitizer.bypassSecurityTrustResourceUrl('assets/fail.svg'));

    this.registrationForm = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        SignUpValidators.uniqEmail(this.authFacadeService)
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(8)]
      ]
    });
  }
  ngOnInit() {
    this.ngOnChanges();
    this.isLoaded$ = this.store.select(fromRoot.getAuthLoggining);
  }


  SignUp() {
    const userData = this.registrationForm.value;
    this.authFacadeService.SignUp(userData.email, userData.password);
  }

  SignUpWithGoogle() {
    this.authFacadeService.signInWithGoogle();
  }

  ngOnChanges(): void {
    this.registrationForm.get('password').valueChanges.subscribe((val) => {
      this.utils.getPasswordDifficulty(val).subscribe(difficulty => {
        this.difficulty = difficulty;
      });
    });
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
}
