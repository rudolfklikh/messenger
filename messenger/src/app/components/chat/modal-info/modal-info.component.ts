import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { User } from 'src/app/shared/intefaces/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalInfoComponent implements OnInit {

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: User,
  public iconRegistry: MatIconRegistry,
  public sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('mail', sanitizer.bypassSecurityTrustResourceUrl('assets/modal/gmail.svg'));
    iconRegistry.addSvgIcon('about', sanitizer.bypassSecurityTrustResourceUrl('assets/modal/about.svg'));
    iconRegistry.addSvgIcon('notification', sanitizer.bypassSecurityTrustResourceUrl('assets/modal/bell.svg'));
  }

  ngOnInit(): void {
  }

}
