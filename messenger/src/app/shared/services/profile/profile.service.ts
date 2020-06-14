import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { UploadFile } from '../../intefaces/upload-file';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import * as userActions from '../../../components/dashboard/store/actions/user.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private progress = new BehaviorSubject<boolean>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<fromRoot.State>) { }

  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;

  ChangeUserPhoto(data: UploadFile) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${data.UID}`).put(data.photoURL);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      this.progress.next(( snapshot.bytesTransferred / snapshot.totalBytes * 100 === 100) ? true : false);
    }, (error) => console.log(error), () => {
      firebase.storage().ref(`${this.basePath}/${data.UID}`).getDownloadURL().then(url => {
        const photoURL = { photoURL: url };
        this.afAuth.auth.currentUser.updateProfile(photoURL);
        this.afs.doc<any>(`users/${data.UID}`).set(photoURL, { merge: true });
        this.store.dispatch(new userActions.SetUserPhotoURL(url));
      });
    });
  }

  get progress$(): Observable<boolean> {
    return this.progress.asObservable().pipe(distinctUntilChanged());
  }

  changeAbout(aboutText: string) {
    const about = { aboutText };
    this.afs.doc<any>(`users/${localStorage.getItem('userUID')}`).set(about, { merge: true });
    this.store.dispatch(new userActions.SetUserInfo(aboutText));
  }
}
