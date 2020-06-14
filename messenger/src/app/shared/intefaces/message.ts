export interface Message {
  uniqUID: string;
  msg: string;
  yourUniqUID: string;
  fromUsers: Array<string>;
  date: Date;
}
