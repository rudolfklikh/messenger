import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app.reducer';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { UserState } from '../../store/state/user.state';
import { trigger, transition, useAnimation } from '@angular/animations';
import { lightSpeedIn, lightSpeedOut } from 'ng-animate';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/authorization/auth.service';

@Component({
  selector: 'app-profile-modal-info',
  templateUrl: './profile-modal-info.component.html',
  styleUrls: ['./profile-modal-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('showMenu', [
      transition('void => *', useAnimation(lightSpeedIn, {
        params: { timing: 0.4 }
      })),
      transition('* => void', useAnimation(lightSpeedOut, {
        params: { timing: 0.4 }
      }))
    ])
  ]
})
export class ProfileModalInfoComponent implements OnInit {
  public status$: Observable<string>;
  public photoUrl$: Observable<string>;
  public userAbout$: Observable<string>;
  public progress$: Observable<boolean>;
  public showTextArea = false;
  public textArea = new FormControl('', [Validators.required, Validators.maxLength(30)] );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data$: Observable<UserState>,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    private store: Store<fromRoot.State>,
    private profileService: ProfileService,
    private authService: AuthService) {
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/close(1).svg'));
    iconRegistry.addSvgIcon('camera', sanitizer.bypassSecurityTrustResourceUrl('assets/camera.svg'));
    iconRegistry.addSvgIcon('mail', sanitizer.bypassSecurityTrustResourceUrl('assets/email.svg'));
    iconRegistry.addSvgIcon('about', sanitizer.bypassSecurityTrustResourceUrl('assets/about.svg'));
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/edit.svg'));
  }


  ngOnInit(): void {
    this.status$ = this.store.select(fromRoot.getAuthStatus);
    this.photoUrl$ = this.store.select(fromRoot.getUserPhotoURL);
    this.userAbout$ = this.authService.user$;
  }

  UpdatePhoto(event) {
    const imgUrl = event.target.files[0];
    const reader = new FileReader();
    this.progress$ = this.profileService.progress$;
    reader.readAsDataURL(imgUrl);
    reader.addEventListener('load', () => {
      const updatedData = { photoURL: imgUrl, UID: localStorage.getItem('userUID') };
      this.profileService.ChangeUserPhoto(updatedData);
    });
  }

  showPlaceHolder() {
    this.showTextArea = (this.showTextArea === false) ? true : false;
  }

  ChangeAbout() {
    this.profileService.changeAbout(this.textArea.value);
    this.showTextArea = false;
  }
}
