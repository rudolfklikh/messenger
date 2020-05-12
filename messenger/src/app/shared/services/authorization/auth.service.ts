import { Injectable } from '@angular/core';
import { User } from '../../intefaces/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as authActions from '../../../components/authentication/store/actions/authentication.actions';
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
    console.log('Construktor');
    console.log(JSON.parse(localStorage.getItem('user')));
    if (JSON.parse(localStorage.getItem('user'))) {
      const UID = JSON.parse(localStorage.getItem('user')).uid;
      this.cookieService.set('uniqUid', UID);
      this.store.dispatch(new authActions.SetAuthenticated({ isLogged: true, isLoggining: false, status: 'online', UID }));
      this.presenceService.combineAuthState();
      this.user$ = of(JSON.parse(localStorage.getItem('user')));
    } else {
      console.log('USER === NULL');
      this.user$ = of(null);
      this.cookieService.delete('uniqUid');
    }
  }
  SignIn(email, password) {   // Sign in with email/password
    return this.http.post<User>('http://localhost:3000/api/login', { email, password });
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
      UID: JSON.parse(localStorage.getItem('user')).uid
    }));
    this.router.navigate(['sign-in']);
    localStorage.removeItem('user');
  }
}
