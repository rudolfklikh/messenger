import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { User } from 'src/app/shared/intefaces/user';
import { AuthService } from 'src/app/shared/services/authorization/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  newMessage: string;
  messageList: string[] = [];

  @Input() user: User;

  private you: User;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        console.log(message);
        this.messageList.push(message);
        console.log(this.messageList);
      });

    this.authService.getUser().then(user => {
      this.you = user;
    });
  }

  sendMessage() {
    const obj = {uniqUID: this.user.uid, msg: this.newMessage, yourUniqUID: this.you.uid};
    console.log(obj);
    this.chatService.sendMessage(obj);
    this.newMessage = '';
  }

}
