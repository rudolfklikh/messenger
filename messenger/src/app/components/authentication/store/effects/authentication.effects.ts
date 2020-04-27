import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromRoot from '../../../../app.reducer';
import * as authActions from '../actions/authentication.actions';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect() unAuth$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActions.SetUnauth),
    map((action: authActions.SetUnauthenticated) => action.payload),
    switchMap(({ status, UID }) => this.afs.doc(`users/${UID}`).update({ status })
      .then((res) => {
        this.afAuth.auth.signOut();
        return new authActions.SetInitial();
      })
    )
  );

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router) { }
}
