import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {Transaction} from "../_models/transaction";
import {TransactionService} from "../_services/transaction.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  private currentUser: User = undefined;
  private transactions: Transaction[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router, private transactionService: TransactionService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    this.transactions = this.transactionService.getTransactionsOfUser(this.currentUser.id);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get currentAccountState(): number {
    let sum = 0;
    this.transactions.forEach(transaction => {
      if (transaction.payer.id === this.currentUser.id) {
        sum -= transaction.amount;
      } else {
        sum += transaction.amount;
      }
    });
    return sum;
  }
}
