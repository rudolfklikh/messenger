import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { User } from 'src/app/shared/intefaces/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog  } from '@angular/material/dialog';
import * as moment from 'moment';
import { ModalInfoComponent } from './modal-info/modal-info.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() user: User;
  public messages = [];
  public mobileSize: boolean;
  public newMessage = new FormControl('', [Validators.required]);
  private currentUser: User;

  constructor(
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    private chatService: ChatService,
    public modalInfo: MatDialog,
    private activatedRoute: ActivatedRoute) {
    iconRegistry.addSvgIcon('interface', sanitizer.bypassSecurityTrustResourceUrl('assets/chat/interface.svg'));
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      map(params => params.uid),
      switchMap(uid => this.chatService.getMessages(uid))).subscribe(messages => this.messages = messages);
    (window.innerWidth < 992) ? this.mobileSize = true : this.mobileSize = false;
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  sendMessage() {
    if (this.newMessage.value) {
      const message = {
        uniqUID: this.user.uid,
        msg: this.newMessage.value,
        yourUniqUID: this.currentUser.uid,
        fromUsers: [this.user.uid, this.currentUser.uid],
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
      };
      this.chatService.sendMessage(message);
      this.newMessage.setValue('');
    } else {
      return;
    }
  }

  showModalInfo() {
    console.log('Hello');
    this.modalInfo.open(ModalInfoComponent, {
      panelClass: 'modal-info-dialog',
      data: this.user
    });
  }
}
