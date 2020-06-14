import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../intefaces/message';
import * as moment from 'moment';

@Pipe({
  name: 'messages'
})
export class MessagesPipe implements PipeTransform {

  transform(messages: Array<Message>, value: string): Array<Message> {

    if (!messages) {
      return messages;
    } else {
      return messages.sort(
        (a, b) => +moment(a.date, 'MMMM Do YYYY, h:mm:ss a').toDate() - (+moment(b.date, 'MMMM Do YYYY, h:mm:ss a').toDate())
        );
    }
  }
}
