import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FooterComponent } from './_modules/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./_modules/header/header.component";
import {StorageServiceModule} from "angular-webstorage-service";
import { RouterModule, Routes } from '@angular/router'
import { PageNotFoundComponent } from './_error-pages/page-not-found/page-not-found.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./_helpers/auth.guard";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { LoginSnackBarComponent } from './login/login-snack-bar/login-snack-bar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { TransactionsTableComponent } from './_modules/transactions-table/transactions-table.component';
import {MatTableModule} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {HttpConfigInterceptor} from "./_services/interceptor/httpconfig.interceptor";
import {MatSelectModule} from "@angular/material/select";

const appRoutes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '',
    redirectTo: '/profile',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ProfileComponent,
    LoginComponent,
    LoginSnackBarComponent,
    TransactionsTableComponent
  ],
  entryComponents: [
    LoginSnackBarComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LoggerModule.forRoot({
            serverLoggingUrl: '/api/logs',
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR
        }),
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false}
        ),
        StorageServiceModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatTableModule,
        MatSelectModule
    ],
  providers: [
      DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
