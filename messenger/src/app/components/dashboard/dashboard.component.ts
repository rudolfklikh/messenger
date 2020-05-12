import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/intefaces/user';
import { Socket } from 'ngx-socket-io';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public selectedUser: User;
  opened: boolean;
  mobileSize = false;
  constructor(
    private socket: Socket,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon('back', sanitizer.bypassSecurityTrustResourceUrl('assets/curve.svg'));
      iconRegistry.addSvgIcon('dummyprofile', sanitizer.bypassSecurityTrustResourceUrl('assets/dummyprofile.svg'));
    }
  ngOnInit() {
    this.socket.connect();
    (window.innerWidth < 992) ? this.mobileSize = true : this.mobileSize = false;
  }
  showChat(user: User) {
    if (window.innerWidth < 992) {
      this.mobileSize = true;
    } else {
      this.mobileSize = false;
    }
    this.selectedUser = user;
  }
  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
