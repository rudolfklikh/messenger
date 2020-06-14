import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, SimpleChange, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take, delay } from 'rxjs/operators';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { User } from 'src/app/shared/intefaces/user';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog  } from '@angular/material/dialog';
import * as moment from 'moment';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { Observable, timer } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { UserState } from '../dashboard/store/state/user.state';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() user: User;
  @ViewChild('msgContainer') private msgWrapper: ElementRef;
  public moment: any = moment;
  public messages$: Observable<any[]>;
  public mobileSize$: Observable<number>;
  public loadingSpinner$: Observable<boolean>;
  public newMessage = new FormControl('', [Validators.required]);
  public currentUser: UserState;

  constructor(
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    private chatService: ChatService,
    public modalInfo: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private store: Store<fromRoot.State>) {
    iconRegistry.addSvgIcon('interface', sanitizer.bypassSecurityTrustResourceUrl('assets/chat/interface.svg'));
  }


  ngOnInit(): void {
    this.loadingSpinner$ = this.store.select(fromRoot.getSharedLoading);
    this.messages$ = this.activatedRoute.queryParams
    .pipe(
      map(params => params.uid),
      delay(0),
      switchMap(uid => this.chatService.getMessages(uid))
    );
    this.mobileSize$ = this.utilsService.onResize$;
    this.utilsService.onResize(window.innerWidth);
    this.store.select(fromRoot.getUserState).pipe(take(1)).subscribe(user => this.currentUser = user);
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes.user.previousValue !== changes.user.currentValue) {
      this.ngAfterViewInit();
    }
  }


  ngAfterViewInit(): void {
    timer(2000).pipe(map(() => this.scrollToBottom())).subscribe();
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
        yourUniqUID: localStorage.getItem('userUID'),
        fromUsers: [this.user.uid, localStorage.getItem('userUID')],
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
