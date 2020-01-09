import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../_models/transaction";
import {User} from "../../_models/user";

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
export class TransactionsTableComponent implements OnInit {

  @Input('transactions') transactions: Transaction[];
  @Input('currentUser') currentUser: User;

  displayedColumns: string[] = ['date', 'receiverName', 'receiverIban', 'payerName', 'payerIban', 'amount'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  transactionRows: TransactionTableRow[] = [];

  constructor() {
  }

  ngOnInit() {
    this.transactions.forEach(transaction => {
      this.transactionRows.push({
        date: transaction.date.toLocaleDateString(),
        receiverName: transaction.receiver.firstName + " " + transaction.receiver.lastName,
        receiverIban: transaction.receiver.iban,
        payerName: transaction.payer.firstName + " " + transaction.payer.lastName,
        payerIban: transaction.payer.iban,
        amount: transaction.amount
      })
    });
  }
}
