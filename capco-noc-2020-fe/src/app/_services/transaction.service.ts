import { Injectable } from '@angular/core';
import {Transaction} from "../_models/transaction";
import {UserService} from "./user.service";
import {User} from "../_models/user";

declare function require(url: string);

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private transactions: Transaction[] = [];

  constructor(private userService: UserService) {
    this.transactions = this.processJsonDataToTransactionsList(this.getRawTransactions()); // load users from storage
  }

  private getRawTransactions(): Array<any> {
    // this SHOULD be replaced by REST call
    return require('../_mock-data/transactions.json');
  }

  public getTransactionsOfUser(id: number) {
    // this may be replaced by REST call
    let transactionsOfUser: Transaction[] = [];
    this.transactions.forEach(transaction => {
      if (transaction.payer.id === id || transaction.receiver.id === id) {
        transactionsOfUser.push(transaction);
      }
    });
    return transactionsOfUser;
  }

  // Help method to convert JSON data to list of Transaction objects
  private processJsonDataToTransactionsList(transactionsDataJson: any): Transaction[] {
    let processedTransactions: Array<Transaction> = [];
    transactionsDataJson.forEach(transactionJson => {
      let payer = this.userService.getUserById(Number.parseInt(transactionJson.payer));
      let receiver = this.userService.getUserById(Number.parseInt(transactionJson.receiver));
      processedTransactions.push(
        Transaction.parseFromJson(transactionJson.id, payer, receiver, transactionJson.date, transactionJson.amount));
    });
    return processedTransactions;
  }
}
