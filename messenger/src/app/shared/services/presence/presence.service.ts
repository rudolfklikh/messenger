import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { combineLatest, Observable, of } from 'rxjs';
import { status } from 'src/app/components/authentication/store/state/authentication.state';
import { AuthState } from '../../intefaces/auth-state';
import { map } from 'rxjs/internal/operators/map';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private storeStatus$: Observable<status>;
  private storeUID$: Observable<string>;

  constructor(
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<fromRoot.State>,
    private db: AngularFireDatabase) {

    }

  combineAuthState() {
    this.storeStatus$ = this.store.select(fromRoot.getAuthStatus);
    this.storeUID$ = this.store.select(fromRoot.getAuthUID);
    combineLatest([this.storeStatus$, this.storeUID$]).subscribe((result: Array<string | status>) => {
      const authState: AuthState = {
        status: result[0],
        UID: result[1]
      };
      if (authState.UID) {
        this.setPresence(authState);
      }
    });
  }

  setPresence(state: any) {
    this.afs.doc(`users/${state.UID}`).update({ status: state.status });
  }

  // updateOnUser() {
  //   const connection =  this.db.object('.info/connected').valueChanges().pipe(
  //     map((connected) => console.log(connected))
  //   );
  //   console.log(connection.subscribe(ff => {
  //     console.log(ff);
  //   }))
  //   return this.afAuth.authState.pipe(
  //     switchMap(user =>  user ? connection : of('offline')),
  //   );

  // }
  // updateOnAway() {
  //   document.onvisibilitychange = (e) => {
  //     if (document.visibilityState === 'hidden') {
  //       this.store.select(fromRoot.getAuthUID).subscribe(UID => {
  //         this.setPresence({ status: 'away', UID });
  //       });
  //     } else {
  //       this.updateOnUser().subscribe(status => {
  //         console.log(status);
  //         if (status === 'online') {
  //           console.log('Hello');
  //           this.store.select(fromRoot.getAuthUID).subscribe(UID => {
  //             this.setPresence({ status: 'online', UID });
  //           });
  //         } else {
  //           this.store.select(fromRoot.getAuthUID).subscribe(UID => {
  //             this.setPresence({ status: 'offline', UID });
  //           });
  //         }
  //       });
  //     }
  //   };
  // }
}
