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
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { take, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private utilsService: UtilsService,
    private snackBar: MatSnackBar) {
      iconRegistry.addSvgIcon('back', sanitizer.bypassSecurityTrustResourceUrl('assets/dashboard/curve.svg'));
      iconRegistry.addSvgIcon('dummyprofile', sanitizer.bypassSecurityTrustResourceUrl('assets/dummyprofile.svg'));
    }
  ngOnInit() {
    this.socket.connect();
    this.mobileSize$ = this.utilsService.onResize$;
    this.utilsService.onResize(window.innerWidth);
    this.snackBar.open(`Welcome back ${JSON.parse(localStorage.getItem('user')).email}`, `Close`, {
      duration: 5000
    });
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
