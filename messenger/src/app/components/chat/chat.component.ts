import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ChatService } from 'src/app/shared/services/chat/chat.service';
import { User } from 'src/app/shared/intefaces/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  newMessage: string;
  messageList: string[] = [];

  @Input() user: User;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log(message);
        this.messageList.push(message);
      });
  }

  sendMessage() {
    const obj = {uniqUID: this.user.uid, msg: this.newMessage};
    this.chatService.sendMessage(obj);
    this.newMessage = '';
  }

}
