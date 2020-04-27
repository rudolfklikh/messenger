import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { lightSpeedIn, lightSpeedOut } from 'ng-animate';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';

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

  constructor(
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    private authFacadeService: AuthFacadeService) {
    iconRegistry.addSvgIcon('portfolio', sanitizer.bypassSecurityTrustResourceUrl('assets/portfolio.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('assets/info.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('assets/worker.svg'));
    iconRegistry.addSvgIcon('exit', sanitizer.bypassSecurityTrustResourceUrl('assets/exit.svg'));
  }

  ngOnInit(): void {
  }

  toggleHamburger() {
    (this.toggleBool === false) ? this.toggleBool = true : this.toggleBool = false;
  }
  SignOut() {
    this.authFacadeService.SignOut();
  }

}
