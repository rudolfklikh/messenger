import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { User } from '../../intefaces/user';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket, private authService: AuthService) {
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    console.log('Hello');
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        console.log(message);
        this.authService.getUser().then((user: User) => {
          if (user.uid === message.yourUniqUID) {
            console.log('Hello');
            const msgFromYou = {
              ...message,
              fromYou: true
            };
            observer.next(msgFromYou);
          } else {
            observer.next(message);
          }
        });
      });
    });
  }
}
