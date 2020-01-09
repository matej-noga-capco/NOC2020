import {User} from "./user";

export class Transaction {

  id: number;
  receiver: User;
  payer: User;
  amount: number;
  date: Date;

  // Get new transaction object from JSON values
  public static parseFromJson(id, receiver, payer, date, amount): Transaction {
    let newTransaction = new Transaction();
    newTransaction.id = id;
    newTransaction.receiver = receiver;
    newTransaction.payer = payer;
    newTransaction.amount = amount;
    newTransaction.date = new Date(date);
    return newTransaction;
  }
}
