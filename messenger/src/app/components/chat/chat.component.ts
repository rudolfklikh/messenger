import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, debounceTime, take } from 'rxjs/operators';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { User } from 'src/app/shared/intefaces/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog  } from '@angular/material/dialog';
import * as moment from 'moment';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { fromEvent, Observable, timer } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @Input() user: User;
  @ViewChild('msgContainer') private msgWrapper: ElementRef;
  public moment: any = moment;
  public messages$: Observable<any[]>;
  public mobileSize$: Observable<number>;
  public newMessage = new FormControl('', [Validators.required]);
  private currentUser: User;

  constructor(
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    private chatService: ChatService,
    public modalInfo: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService) {
    iconRegistry.addSvgIcon('interface', sanitizer.bypassSecurityTrustResourceUrl('assets/chat/interface.svg'));
  }

  ngOnInit(): void {
    this.messages$ = this.activatedRoute.queryParams
    .pipe(
      map(params => params.uid),
      switchMap(uid => this.chatService.getMessages(uid))
    );
    this.mobileSize$ = this.utilsService.onResize$;
    this.utilsService.onResize(window.innerWidth);
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }


  ngAfterViewInit(): void {
    timer(1000).pipe(take(1), map(() => this.scrollToBottom())).subscribe();
  }
  scrollToBottom(): void {
    this.msgWrapper.nativeElement.scrollTop = this.msgWrapper.nativeElement.scrollHeight;
  }
  showModalInfo(): void {
    this.modalInfo.open(ModalInfoComponent, { panelClass: 'modal-info-dialog', data: this.user });
  }

  sendMessage(): void {
    if (this.newMessage.value) {
      const message = {
        uniqUID: this.user.uid,
        msg: this.newMessage.value,
        yourUniqUID: this.currentUser.uid,
        fromUsers: [this.user.uid, this.currentUser.uid],
        date: this.moment().format('MMMM Do YYYY, h:mm:ss a')
      };
      this.chatService.sendMessage(message);
      this.newMessage.setValue('');
      this.scrollToBottom();
    } else {
      return;
    }
  }

  trackByMsg(index, item: any): string {
    return item.msg;
  }
}
