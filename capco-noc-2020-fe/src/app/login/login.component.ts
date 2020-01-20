import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginSnackBarComponent} from "./login-snack-bar/login-snack-bar.component";
import {MatSnackBarRef} from "@angular/material/snack-bar/typings/snack-bar-ref";
import {DOCUMENT} from "@angular/common";
import {ConstantsHelper} from "../_helpers/constants.helper";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public loginSnackBar: MatSnackBarRef<any> = undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar) {

    sessionStorage.removeItem(ConstantsHelper.LS_USER_TOKEN_KEY);
  }

  ngOnInit() {
  }

  onSubmitLogin() {
    if (this.loginSnackBar) {
      this.loginSnackBar.dismiss();
    }

    const data = "username=" + this.username + "&password=" + this.password;

    this.authenticationService.login(data).subscribe(loggingUser => {
      if (loggingUser) {
        this.authenticationService.setLoggedIn(true);
        this.router.navigate(['/profile']);
      } else {
        this.openLoginFailedSnackBar();
      }
    });
  }

  private openLoginFailedSnackBar() {
    this.loginSnackBar = this._snackBar.openFromComponent(LoginSnackBarComponent, {
      duration: 3000,
      panelClass: ['sb-custom']
    });
  }

  public keyPressed(event: KeyboardEvent) {
    if(event.keyCode === 13) {
      this.onSubmitLogin();
    }
  }
}
