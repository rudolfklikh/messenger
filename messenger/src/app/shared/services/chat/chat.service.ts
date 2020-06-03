import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as SharedActions from '../../store/actions/shared.actions';

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
    const currentUserUid = JSON.parse(localStorage.getItem('user')).uid;
    return this.afs.collection<any>('messages').snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data())),
      map((messages) => {
        const sortMessages = messages.sort((msg1, msg2) => {
          if (msg1.date > msg2.date) { return 1; }
          if (msg1.date < msg2.date) { return -1; }
        });
        return sortMessages;
      }),
      delay(1000),
      map((messages: Array<any>) => messages.filter((message: any) => {
        if ((uid === message.fromUsers[0] || uid === message.fromUsers[1]) &&
          (currentUserUid === message.fromUsers[0] || currentUserUid === message.fromUsers[1])) {
          return message;
        }
        this.store.dispatch(new SharedActions.SetLoading(false));
      })));
  }
}
