import { Injectable, Input } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromRoot from '../../../../app.reducer';
import * as authActions from '../actions/authentication.actions';
import { map, switchMap, tap, catchError, mergeMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/authorization/auth.service';
import { User } from 'src/app/shared/intefaces/user';
import { Err } from 'src/app/shared/intefaces/error';
import { PresenceService } from 'src/app/shared/services/presence/presence.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable()
export class AuthEffects {
  @Effect() unAuth$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActions.SetUnauth),
    map((action: authActions.SetUnauthenticated) => action.payload),
    switchMap(({ status, UID }) => this.afs.doc(`users/${UID}`).update({ status, lastVisit: moment().format('MMMM Do YYYY, h:mm:ss a') })
      .then(() => {
        this.afAuth.auth.signOut();
        this.cookieService.delete('uniqUid');
        return new authActions.SetInitial();
      })
    )
  );
  @Effect() regUser$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActions.SetRegister),
    map((action: authActions.SetRegister) => action.payload),
    switchMap(({ email, password }) => this.authService.SignUp(email, password).pipe(
      map((response: User) => new authActions.SuccessfullRegister(response.email)),
      catchError((err: Err) => of(new authActions.FailRegister(err.error.message)))
    ))
  );

  @Effect() resetPassword$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActions.ResetPassword),
    map((action: authActions.ResetPassword) => action.payload),
    switchMap((email) => this.authService.ForgotPassword(email).pipe(
      map((response: any) => new authActions.SuccessfulResetPassword(response),
            catchError((err: Err) => of(new authActions.FailResetPassword(err.error.message))))
    ))
  );

  @Effect() loginUser$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActions.SetLogin),
    map((action: authActions.SetLogin) => action.payload),
    switchMap(({ email, password }) => this.authService.SignIn(email, password).pipe(
      map((response: User) => new authActions.SuccessfulLogin(response)),
      catchError((err: Err) => of(new authActions.FailLogin(err.error)))
    ))
  );

  @Effect() loginUserGoogle$: Observable<Action> = this.actions$.pipe(
    ofType(authActions.AuthActions.SetLoginGoogle),
    map((action: authActions.SetLoginGoogle) => action.payload),
    switchMap((user: User) => this.authService.AuthLogin(user).pipe(
      map((response: User) => new authActions.SuccessfulLogin(response)),
      catchError((err: Err) => of(new authActions.FailLogin(err.error.message)))
    ))

  );

  @Effect({ dispatch: false }) succRegister$: Observable<string> = this.actions$.pipe(
    ofType(authActions.AuthActions.SuccessfulRegister),
    map((action: authActions.SuccessfullRegister) => action.payload),
    tap((email) => {
      localStorage.setItem('email', email);
      this.snackBar.open(`Hello ${email}`, `Close`, {
        duration: 5000
      });
      this.router.navigate(['verify-email-address']);
    })
  );

  @Effect({ dispatch: false }) succLogin$: Observable<User> = this.actions$.pipe(
    ofType(authActions.AuthActions.SuccessfulLogin),
    map((action: authActions.SuccessfulLogin) => action.payload),
    tap((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.store.dispatch(new authActions.SetAuthenticated({ isLogged: true, isLoggining: false, status: 'online', UID: user.uid }));
      this.presenceService.combineAuthState();
      this.cookieService.set('uniqUid', user.uid);
      this.snackBar.open(`Hello ${user.email}`, `Close`, {
        duration: 5000
      });
      this.router.navigate(['dashboard']);
    })
  );

  @Effect({ dispatch: false }) failRegister$: Observable<string> = this.actions$.pipe(
    ofType(authActions.AuthActions.FailRegiser),
    map((action: authActions.FailRegister) => action.payload),
    tap((error: any) => {
      this.snackBar.open(`${error}.Try again:)`, `Close`, {
        duration: 5000
      });
    })
  );

  @Effect({ dispatch: false }) failLogin$: Observable<Action | string> = this.actions$.pipe(
    ofType(authActions.AuthActions.FailLogin),
    map((action: authActions.FailLogin) => action.payload),
    tap((error: any) => {
      console.log(error);
      if (error.hasOwnProperty('type')) {
        this.snackBar.open(`Error:  ${error.message}`, `Resend Email`, {
          duration: 5000
        }).afterDismissed().pipe(
          map((snack) => snack.dismissedByAction),
          switchMap((bool: boolean) => {
            if (bool) {
              return this.authService.SendVerificationMail().pipe(
                map(response => response.message)
              );
            } else {
              return of(null);
            }
          })).subscribe(res => {
            if (res) {
              this.snackBar.open(`Please  ${res}`, `Close`, {
                duration: 5000
              });
            }
          });
      } else {
        this.snackBar.open(`Error:  ${error.message}`, `Close`, {
          duration: 5000
        });
      }
    }));

    @Effect({ dispatch: false }) succResetPassword$: Observable<string> = this.actions$.pipe(
      ofType(authActions.AuthActions.SuccessfulResetPassword),
      map((action: authActions.SuccessfulResetPassword) => action.payload),
      tap((obj: any) => {
        console.log(obj);
        this.snackBar.open(`${obj.email} ${obj.message}`, `Close`, {
          duration: 5000
        });
      })
    );

    @Effect({ dispatch: false }) failResetPassword$: Observable<string> = this.actions$.pipe(
      ofType(authActions.AuthActions.FailResetPassword),
      map((action: authActions.FailResetPassword) => action.payload),
      tap((err: any) => {
        this.snackBar.open(`${err}. Try again later`, `Close`, {
          duration: 5000
        });
      })
    );
  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private presenceService: PresenceService,
    private snackBar: MatSnackBar,
    private cookieService: CookieService) { }
}
