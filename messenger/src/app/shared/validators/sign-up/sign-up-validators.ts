import { AuthFacadeService } from '../../services/authorization/auth-facade.service';
import { AbstractControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime, switchMap, map, first } from 'rxjs/operators';




export class SignUpValidators {
  static uniqEmail(authfacadeService: AuthFacadeService) {
    return (control: AbstractControl) => control.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(750),
      switchMap((email) => authfacadeService.CheckUserEmail(email)),
      map((response) => response ? { uniqEmail: true } : null),
      first()
    );
  }
}
