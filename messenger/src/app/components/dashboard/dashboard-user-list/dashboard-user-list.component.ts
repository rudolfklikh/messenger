import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { User } from 'src/app/shared/intefaces/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { Observable } from 'rxjs';
import { take, delay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-user-list',
  templateUrl: './dashboard-user-list.component.html',
  styleUrls: ['./dashboard-user-list.component.scss']
})
export class DashboardUserListComponent implements OnInit {
  public currentUser: User;
  public usersList$: Observable<Array<User>>;
  public currentEmail$: Observable<string>;
  @Output() emitUser = new EventEmitter();
  @Input() searchStr: string;

  constructor(private authFacadeService: AuthFacadeService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.usersList$ = this.authFacadeService.GetAllUsers().pipe(delay(1500));
    this.currentEmail$ = this.store.select(fromRoot.getUserEmail).pipe(take(1));
  }

  eventUser(user: User) {
    this.emitUser.emit(user);
  }
}
