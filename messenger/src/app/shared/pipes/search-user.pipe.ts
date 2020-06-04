import { Pipe, PipeTransform, ɵConsole } from '@angular/core';
import { User } from '../intefaces/user';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {
  transform(users: Array<User>, value: string) {
    if (value.toLowerCase() === undefined || !users) {
      return users;
    } else {
      return users.filter(user => {
        return user.email.toLowerCase().includes(value.toLowerCase());
      });
    }
  }
}
