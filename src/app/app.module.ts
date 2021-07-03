import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule} from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { Ng2IziToastModule } from 'ng2-izitoast';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MetismenuAngularModule} from '@metismenu/angular';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    AuthModule,
    Ng2IziToastModule,
    MetismenuAngularModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    HttpClient,
    HttpClientModule,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
