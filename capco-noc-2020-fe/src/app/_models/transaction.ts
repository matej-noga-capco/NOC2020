import {User} from "./user";

export class Transaction {

  id: number;
  receiver: User;
  payer: User;
  amount: number;
  date: Date;
}
