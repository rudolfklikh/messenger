import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/intefaces/user';
import { AuthService } from 'src/app/shared/services/authorization/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public selectedUser: User;

  constructor() {}
  ngOnInit() {}

  showChat(user: User) {
    this.selectedUser = user;
  }
}
