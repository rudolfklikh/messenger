import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/shared/intefaces/user';
import { Socket } from 'ngx-socket-io';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoComponent } from '../chat/modal-info/modal-info.component';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public selectedUser: User;
  public opened: boolean;
  public mobileSize$: Observable<boolean>;
  public moment: any = moment;
  constructor(
    private router: Router,
    private socket: Socket,
    public iconRegistry: MatIconRegistry,
    public modalInfo: MatDialog,
    public sanitizer: DomSanitizer,
    private utilsService: UtilsService) {
      iconRegistry.addSvgIcon('back', sanitizer.bypassSecurityTrustResourceUrl('assets/dashboard/curve.svg'));
      iconRegistry.addSvgIcon('dummyprofile', sanitizer.bypassSecurityTrustResourceUrl('assets/dummyprofile.svg'));
    }
  ngOnInit() {
    this.socket.connect();
    this.mobileSize$ = this.utilsService.onResize$;
    this.utilsService.onResize(window.innerWidth);
  }
  showChat(user: User) {
    this.selectedUser = user;
    this.router.navigate(['/dashboard'], { queryParams:  { uid: user.uid } });
  }
  showModalInfo() {
    this.modalInfo.open(ModalInfoComponent, {
      panelClass: 'modal-info-dialog',
      data: this.selectedUser
    });
  }
  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
