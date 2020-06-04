import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthFacadeService } from 'src/app/shared/services/authorization/auth-facade.service';
import { User } from 'src/app/shared/intefaces/user';


@Component({
  selector: 'app-dashboard-user-list',
  templateUrl: './dashboard-user-list.component.html',
  styleUrls: ['./dashboard-user-list.component.scss']
})
export class DashboardUserListComponent implements OnInit {
  public usersList: Array<User>;
  public currentUser: User;
  @Output() emitUser = new EventEmitter();
  @Input() searchStr: string;

  constructor(private authFacadeService: AuthFacadeService) { }

  ngOnInit(): void {
    this.authFacadeService.GetAllUsers().subscribe(users => this.usersList = users);
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  eventUser(user: User) {
    this.emitUser.emit(user);
  }
}
