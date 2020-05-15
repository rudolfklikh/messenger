import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';
import { AuthService } from '../authorization/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messageCollection: AngularFirestoreCollection<any[]>;

  constructor(private socket: Socket, private authService: AuthService, private afs: AngularFirestore) {
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages(uid: string) {
    const currentUserUid = JSON.parse(localStorage.getItem('user')).uid;
    return this.afs.collection<any>('messages').snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data())),
      map((messages: Array<any>) => messages.filter((message: any) => {
        if ((uid === message.fromUsers[0] || uid === message.fromUsers[1]) && (currentUserUid === message.fromUsers[0] || currentUserUid === message.fromUsers[1])) {
          return message;
        }
      })));
  }
}
