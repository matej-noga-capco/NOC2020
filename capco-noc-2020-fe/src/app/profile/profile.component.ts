import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {Transaction} from "../_models/transaction";
import {TransactionService} from "../_services/transaction.service";
import {BehaviorSubject, Subject, Subscription} from "rxjs";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {

  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  public users: User[] = [];
  public transactions: Subject<Transaction[]> = new Subject<Transaction[]>();
  public savings: number = 0;

  subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private transactionService: TransactionService) { }

  ngOnInit() {

    this.userService.getUsers().then(users => {
      this.users = users;

      this.subscriptions.push(
          this.currentUser.subscribe(user => {
            if (user) {
              this.transactionService.getTransactionsOfUser(user.id).then(transactions => {
                this.transactions.next(transactions);
                this.calculateAccountAmount(transactions, user.id);
              });
            }
          })
      );
    });
  }

  private calculateAccountAmount(transactions: Transaction[], currentUserId: number) {
    let sum = 0;
    transactions.forEach(transaction => {
      if (transaction.payer.id === currentUserId) {
        sum -= transaction.amount;
      } else {
        sum += transaction.amount;
      }
    });
    this.savings = sum;
  }

  onChangeUser(selectedUserId: any) {
    this.users.forEach(u => {
      if(u.id == selectedUserId) {
        this.currentUser.next(u);
      }
    })
  }

  logout() {
    this.authenticationService.logout().subscribe(res => {
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => { s.unsubscribe()});
  }

}
