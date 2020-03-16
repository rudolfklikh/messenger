import { Component, OnInit } from '@angular/core';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { lightSpeedOut, lightSpeedIn } from 'ng-animate';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

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
  public usersList;
  public messages = [
    {data: 'Hello how are you?', time: '23:03', from: 'fqw@gmail.com'},
    {data: 'Hello', time: '23:03', from: 'rudfklikh@gmail.com'},
    {data: 'I am fine', time: '23:03', from: 'rudfklikh@gmail.com'},
    {data: 'Lol', time: '23:03', from: 'rudolikh@gmail.com'},
    {data: 'Omega LUL', time: '23:03', from: 'rudolfkh@gmail.com'},
    {data: 'OMEGA OMEGA LUL', time: '23:03', from: 'rudklikh@gmail.com'},
    {data: 'STOP SPAMING', time: '23:03', from: 'rudolkh@gmail.com'},
    {data: 'DUDE RELAX', time: '23:03', from: 'rudolfkkh@gmail.com'},
    {data: 'RLY GUYS STOP DO THIS SHIT', time: '23:03', from: 'rudolfklih@gmail.com'},
    {data: 'RLY GUYS STOP DO THIS SHIT', time: '23:03', from: 'rudolfklih@gmail.com'},
    {data: 'RLY GUYS STOP DO THIS SHIT', time: '23:03', from: 'rudolfklih@gmail.com'},
  ];
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
      this.usersList = users;
    });
  }
  toggleHamburger() {
    (this.toggleBool === false) ? this.toggleBool = true : this.toggleBool = false;
  }

  SignOut() {
    this.authFacadeService.SignOut();
  }
}
