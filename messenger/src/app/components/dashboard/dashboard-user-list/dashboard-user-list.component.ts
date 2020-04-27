import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { User } from 'src/app/shared/intefaces/user';


@Component({
  selector: 'app-dashboard-user-list',
  templateUrl: './dashboard-user-list.component.html',
  styleUrls: ['./dashboard-user-list.component.scss']
})
export class DashboardUserListComponent implements OnInit {
  public usersList: Array<User>;
  @Output() emitUser = new EventEmitter();

  constructor(private authFacadeService: AuthFacadeService) { }

  ngOnInit(): void {
    this.authFacadeService.GetAllUsers().subscribe(users => this.usersList = users );
  }

  eventUser(user: User) {
    this.emitUser.emit(user);
  }
}
