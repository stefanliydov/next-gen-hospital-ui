import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TestResultComponent } from './home/test-result/test-result.component';
import { RunTestComponent } from './run-test/run-test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestResultDetailsComponent } from './home/test-result/test-result-details/test-result-details.component';
import { DoubleToPercentagePipe } from './shared/pipes/double-to-percentage.pipe';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LogoutComponent } from './authorization/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TestResultComponent,
    RunTestComponent,
    TestResultDetailsComponent,
    DoubleToPercentagePipe,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
