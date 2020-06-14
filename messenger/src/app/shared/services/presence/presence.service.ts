import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { combineLatest, Observable } from 'rxjs';
import { status } from 'src/app/components/authentication/store/state/authentication.state';
import { AuthState } from '../../intefaces/auth-state';
import * as authActions from '../../../components/authentication/store/actions/authentication.actions';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private storeStatus$: Observable<status>;
  private storeUID$: Observable<string>;

  constructor( private afs: AngularFirestore, private store: Store<fromRoot.State>) {
    console.log('Hello');
    this.updateOnAway();
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

  setPresence(state: AuthState) {
    this.afs.doc(`users/${state.UID}`).set({ status: state.status }, {
      merge: true
    });
  }
  updateOnAway() {
    document.onvisibilitychange = (e) => {
      if (document.visibilityState === 'hidden') {
        this.store.dispatch(new authActions.SetStatus('away'));
      } else {
        this.store.dispatch(new authActions.SetStatus('online'));
      }
      this.combineAuthState();
    };
  }
}
