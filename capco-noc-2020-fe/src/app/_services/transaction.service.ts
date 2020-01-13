import { Injectable } from '@angular/core';
import {Transaction} from "../_models/transaction";
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {ConstantsHelper} from "../_helpers/constants.helper";

const REST_API_URL_TRANSACTIONS = ConstantsHelper.REST_API_BASE_URL + "/transaction";

@Injectable({ providedIn: 'root' })
export class TransactionService {

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  public async getTransactions(): Promise<Transaction[]> {

    let transactionsArray = await this.httpClient.get<Array<any>>(REST_API_URL_TRANSACTIONS).toPromise();
    let transactionObjects = new Array<Transaction>();

    for(let i = 0; i < transactionsArray.length; i++) {

      let t = transactionsArray[i];
      let tObject = new Transaction();

      tObject.id = t.id;
      tObject.amount = t.amount;
      tObject.date = t.date;
      tObject.payer = await this.userService.getUserById(t.payer);
      tObject.receiver = await this.userService.getUserById(t.receiver);
      transactionObjects.push(tObject);
    }

    return new Promise<Transaction[]>((resolve, reject) => {
      resolve(transactionObjects);
    });
  }

  public async getTransactionsOfUser(id: number): Promise<Transaction[]> {
    return this.getTransactions().then(transactions => {
      let transactionsOfUser: Transaction[] = [];
      transactions.forEach(transaction => {
        if (transaction.payer.id === id || transaction.receiver.id === id) {
          transactionsOfUser.push(transaction);
        }
      });
      return transactionsOfUser;
    });
  }
}
