import {Inject, Injectable} from '@angular/core';
import {Transaction} from "../_models/transaction";
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {AbstractService} from "./abstract.service";
import {DOCUMENT} from "@angular/common";

@Injectable({ providedIn: 'root' })
export class TransactionService extends AbstractService {

  private readonly REST_API_URL_TRANSACTIONS: string;

  constructor(private httpClient: HttpClient, private userService: UserService, @Inject(DOCUMENT) protected document: Document) {
    super(document);
    this.REST_API_URL_TRANSACTIONS = this.REST_API_BASE_URL + "/transaction";
  }

  public async getTransactions(): Promise<Transaction[]> {

    let transactionsArray = await this.httpClient.get<Array<any>>(this.REST_API_URL_TRANSACTIONS).toPromise();
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
