import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginSnackBarComponent} from "./login-snack-bar/login-snack-bar.component";
import {MatSnackBarRef} from "@angular/material/snack-bar/typings/snack-bar-ref";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string = '';
  private password: string = '';
  private loginSnackBar: MatSnackBarRef<any> = undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  private onSubmitLogin() {
    if (this.loginSnackBar) {
      this.loginSnackBar.dismiss();
    }
    this.authenticationService.login(this.username, this.password).then(result => {
      if (result) {
        this.router.navigate(['/profile']);
      } else {
        this.openSnackBar();
      }
    });
  }

  private openSnackBar() {
    this.loginSnackBar = this._snackBar.openFromComponent(LoginSnackBarComponent, {
      duration: 3000,
      panelClass: ['sb-custom']
    });
  }

  private keyPressed(event: KeyboardEvent) {
    if(event.keyCode === 13) {
      this.onSubmitLogin();
    }
  }
}
