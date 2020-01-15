import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Transaction} from "../../_models/transaction";
import {User} from "../../_models/user";
import {Observable, Subject, Subscription} from "rxjs";
import {DatePipe} from "@angular/common";

interface TransactionTableRow {
  date: string,
  receiverName: string,
  receiverIban: string,
  payerName: string,
  payerIban: string,
  amount: number
}

@Component({
  selector: 'app-transactions-table',
  styleUrls: ['./transactions-table.component.css'],
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent implements OnInit, OnDestroy {

  @Input('transactions') transactions: Observable<Transaction[]>;
  @Input('currentUser') currentUser: Subject<User>;

  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['date', 'receiverName', 'receiverIban', 'payerName', 'payerIban', 'amount'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  transactionRows: TransactionTableRow[] = [];

  constructor(public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.transactions.subscribe(transactions => {
        this.transactionRows = [];
        transactions.forEach(transaction => {
            this.transactionRows.push({
              date: transaction.date ? transaction.date.toString() : '',
              receiverName: transaction.receiver.firstName + " " + transaction.receiver.lastName,
              receiverIban: transaction.receiver.iban,
              payerName: transaction.payer.firstName + " " + transaction.payer.lastName,
              payerIban: transaction.payer.iban,
              amount: transaction.amount
            });
        });
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => { s.unsubscribe()});
  }
}
