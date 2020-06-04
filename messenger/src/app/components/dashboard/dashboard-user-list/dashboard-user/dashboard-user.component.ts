import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/intefaces/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  @Input() user: User;
  public currentUser: User;

  constructor(public iconRegistry: MatIconRegistry, public sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('dummyprofile', sanitizer.bypassSecurityTrustResourceUrl('assets/dummyprofile.svg'));
  }

  ngOnInit(): void {}

}
