import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {Transaction} from "../_models/transaction";
import {TransactionService} from "../_services/transaction.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {

  private currentUser: User = undefined;
  private transactions: Subject<Transaction[]> = new Subject<Transaction[]>();
  private savings: number = 0;

  subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router, private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();

    this.transactionService.getTransactionsOfUser(this.currentUser.id).then(transactions => {
      this.transactions.next(transactions);
    });

    this.subscriptions.push(
        this.transactions.subscribe(transactions => {
          let sum = 0;
          transactions.forEach(transaction => {
            if (transaction.payer.id === this.currentUser.id) {
              sum -= transaction.amount;
            } else {
              sum += transaction.amount;
            }
          });
          this.savings = sum;
        })
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => { s.unsubscribe()});
  }
}
