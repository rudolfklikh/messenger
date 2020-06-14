import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { lightSpeedIn, lightSpeedOut } from 'ng-animate';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalInfoComponent } from './profile-modal-info/profile-modal-info.component';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { Observable } from 'rxjs';
import { UserState } from '../store/state/user.state';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
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
export class DashboardMenuComponent implements OnInit {
  public toggleBool = false;
  private currentUser$: Observable<UserState>;

  constructor(
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    private authFacadeService: AuthFacadeService,
    private modalInfo: MatDialog,
    private store: Store<fromRoot.State>) {
    iconRegistry.addSvgIcon('portfolio', sanitizer.bypassSecurityTrustResourceUrl('assets/dashboard/dashboard-menu/portfolio.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('assets/dashboard/dashboard-menu/info.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('assets/dashboard/dashboard-menu/worker.svg'));
    iconRegistry.addSvgIcon('exit', sanitizer.bypassSecurityTrustResourceUrl('assets/dashboard/dashboard-menu/exit.svg'));


  }

  ngOnInit(): void {
    this.currentUser$ = this.store.select(fromRoot.getUserState);
  }

  toggleHamburger() {
    (this.toggleBool === false) ? this.toggleBool = true : this.toggleBool = false;
  }
  showProfileModal() {
    this.modalInfo.open(ProfileModalInfoComponent, { panelClass: 'custom-dialog-container', data: this.currentUser$ });
  }
  SignOut() {
    this.authFacadeService.SignOut();
  }

}
