import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { lightSpeedOut, lightSpeedIn } from 'ng-animate';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/shared/intefaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
export class DashboardComponent implements OnInit {

  public toggleBool = false;
  public usersList: Array<User>;
  public selectedUser: User;
  public user: User;

  constructor(
    public authFacadeService: AuthFacadeService,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer
    ) {
    iconRegistry.addSvgIcon('portfolio', sanitizer.bypassSecurityTrustResourceUrl('assets/portfolio.svg'));
    iconRegistry.addSvgIcon('info', sanitizer.bypassSecurityTrustResourceUrl('assets/info.svg'));
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('assets/worker.svg'));
    iconRegistry.addSvgIcon('exit', sanitizer.bypassSecurityTrustResourceUrl('assets/exit.svg'));
    iconRegistry.addSvgIcon('dummyprofile', sanitizer.bypassSecurityTrustResourceUrl('assets/dummyprofile.svg'));
  }

  ngOnInit() {
    this.authFacadeService.GetAllUsers().subscribe(users => {
      console.log(users);
      this.usersList = users;
    });
    this.authFacadeService.GetUser().then(user => {
      this.user = user;
    });

  }
  toggleHamburger() {
    (this.toggleBool === false) ? this.toggleBool = true : this.toggleBool = false;
  }

  SignOut() {
    this.authFacadeService.SignOut();
  }

  showChat(user: User) {
    this.selectedUser = user;
  }
}
