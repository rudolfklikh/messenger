import { Injectable } from '@angular/core';
import { User } from '../../intefaces/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, first, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as authActions from '../../../components/authentication/store/actions/authentication.actions';
import * as userActions from '../../../components/dashboard/store/actions/user.actions';
import { HttpClient } from '@angular/common/http';
import { PresenceService } from '../presence/presence.service';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  user$: Observable<any>;

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private store: Store<fromRoot.State>,
    private http: HttpClient,
    private presenceService: PresenceService,
    private cookieService: CookieService,
  ) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user);
      } else {
        console.log('BRED');
      }
    });

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            map((userDate: User) => {
              console.log(userDate);
              const stateUser = {
                uid: userDate.uid,
                email: userDate.email,
                displayName: userDate.displayName,
                photoURL: userDate.photoURL,
                emailVerified: userDate.emailVerified,
                about: userDate.aboutText
              };
              this.store.dispatch(new userActions.SetUser({ ...stateUser }));
              this.store.dispatch(new authActions.SetAuthenticated(
                { isLogged: true,
                  isLoggining: false,
                  status: 'online',
                  UID: user.uid
                }));
              localStorage.setItem('userUID', userDate.uid);
              return userDate;
            })
          );
        } else {
          console.log('Here');
          this.store.dispatch(new userActions.SetUser(null));
          localStorage.setItem('userUID', null);
          this.cookieService.delete('uniqUid');
          return of(null);
        }
      }));
    // if (JSON.parse(localStorage.getItem('user'))) {
    //   const UID = JSON.parse(localStorage.getItem('user')).uid;
    //   this.cookieService.set('uniqUid', UID);
    //   this.store.dispatch(new authActions.SetAuthenticated({ isLogged: true, isLoggining: false, status: 'online', UID }));
    //   this.presenceService.combineAuthState();
    //   this.user$ = of(JSON.parse(localStorage.getItem('user')));
    // } else {
    //   this.user$ = of(null);
    //   this.cookieService.delete('uniqUid');
    // }
  }
  async SignIn(email, password) {   // Sign in with email/password
    const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    const userData = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      status: 'offline'
    };
    console.log(userData);
    this.store.dispatch(new authActions.SetLogin(userData));
  }

  LoginWithEmailAndPassword(user: User) {
    return this.http.post<User>('http://localhost:3000/api/login', { ...user });
  }
  SignUp(email, password) {  // Sign up with email/password
    return this.http.post<User | string>('http://localhost:3000/api/register', { email, password });
  }
  AuthLogin(user: User) {   // Auth logic to run auth providers
    return this.http.post<User>('http://localhost:3000/api/login-google', { ...user });
  }
  SendVerificationMail() {
    return this.http.post<any>('http://localhost:3000/api/resend-email', null);
  }
  ForgotPassword(passwordResetEmail) {   // Reset Forggot password
    return this.http.post<any>('http://localhost:3000/api/forgot-password', { passwordResetEmail });
  }
  checkUserEmail(email) {
    return this.afs.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as User)),
      map(actions => actions.filter(user => user.email === email)[0]),
    );
  }
  GetAllUsers(): Observable<any> {
    return this.afs.collection('users').snapshotChanges()
      .pipe(
        map(actions => actions.map(a => a.payload.doc.data() as User)),
        map((users: Array<User>) => users.filter((user: User) => user.emailVerified === true))
      );
  }
  getUser() {
    return this.user$.pipe(first()).toPromise();
  }
  get isLoggedIn(): boolean {   // Returns true when user is looged in and email is verified
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  async GoogleAuth() {   // PopUP with Google then Action !
    const result = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    const userData = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
      emailVerified: result.user.emailVerified,
      status: 'offline'
    };
    this.store.dispatch(new authActions.SetLoginGoogle(userData));
  }
  SignOut() {   // Sign out
    this.store.dispatch(new authActions.SetUnauthenticated({
      isLogged: false,
      isLoggining: false,
      status: 'offline',
      UID: localStorage.getItem('userUID')
    }));
    this.router.navigate(['sign-in']);
    localStorage.removeItem('userUID');
  }
}
