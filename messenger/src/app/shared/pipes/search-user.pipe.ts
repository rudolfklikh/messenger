import { Pipe, PipeTransform, ɵConsole } from '@angular/core';
import { User } from '../intefaces/user';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {
  transform(users: Array<User>, value: string) {
    if (value.toLowerCase() === undefined || !users) {
      return users;
    } else if (value.toLowerCase() === '') {
      const currentUser = users.find((user) => {
        return user.uid === localStorage.getItem('userUID');
      });
      users.splice(users.indexOf(currentUser), 1);
      users.unshift(currentUser);
      return users;
    } else {
      return users.filter(user => {
        return user.email.toLowerCase().includes(value.toLowerCase());
      });
    }
  }
}
