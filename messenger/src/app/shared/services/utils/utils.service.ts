import { Injectable } from '@angular/core';
import { of, Subject, Observable, timer } from 'rxjs';
import { distinctUntilChanged, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private resizeSubject = new Subject<boolean>();

  constructor() { }


  get onResize$(): Observable<any> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }
  onResize(size: number) {
    timer(1).pipe(take(1), map(() => (size > 992) ? this.resizeSubject.next(false) : this.resizeSubject.next(true))).subscribe();
  }

  public getPasswordDifficulty(password: string) {
    const smallLetters = '([a-z]+)';
    const bigLetters = '([A-Z]+)';
    const numb = '([0-9]+)';
    const symbols = /\W/;
    let difficulty = '';
    let protect = 0;

    if (password.length < 8) {
      difficulty = 'weak';
    }

    if (password.match(smallLetters)) {
      protect++;
    }
    if (password.match(bigLetters)) {
      protect++;
    }
    if (password.match(numb)) {
      protect++;
    }
    if (password.match(symbols)) {
      protect++;
    }

    switch (protect) {
      case 2:
        difficulty = 'common';
        break;
      case 3:
        difficulty = 'well';
        break;
      case 4:
        difficulty = 'super';
        break;
      default:
        difficulty = 'weak';
        break;
    }
    return of(difficulty);
  }
}
