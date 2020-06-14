import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as SharedActions from '../../store/actions/shared.actions';
import { Message } from '../../intefaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket, private afs: AngularFirestore, private store: Store<fromRoot.State>) {
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages(uid: string) {
    this.store.dispatch(new SharedActions.SetLoading(true));
    const currentUserUid = localStorage.getItem('userUID');

    return this.afs.collection<any>('messages').snapshotChanges().pipe(
      delay(500),
      map(actions => actions.map(a => a.payload.doc.data())),
      map((messages: Array<Message>) => {
        this.store.dispatch(new SharedActions.SetLoading(false));
        if (currentUserUid === uid) {
          return messages.filter((message: Message) => {
            if ((currentUserUid === message.fromUsers[0] && currentUserUid === message.fromUsers[1])) {
              return message;
            }
          });
        } else {
          return messages.filter((message: Message) => {
            if ((uid === message.fromUsers[0] || uid === message.fromUsers[1]) &&
              (currentUserUid === message.fromUsers[0] || currentUserUid === message.fromUsers[1])) {
              return message;
            }
          });
        }
      }));
  }
}
