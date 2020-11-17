import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authorization/login/login.component';
import { LogoutComponent } from './authorization/logout/logout.component';
import { RegisterComponent } from './authorization/register/register.component';
import { HomeComponent } from './home/home.component';
import { TestResultDetailsComponent } from './home/test-result/test-result-details/test-result-details.component';
import { RunTestComponent } from './run-test/run-test.component';
import { IsLoggedGuard } from './shared/guards/is-logged/is-logged.guard';
import { IsPhysicianGuard } from './shared/guards/is-physycian/is-physician.guard';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsLoggedGuard] },
  { path: 'run-test', component: RunTestComponent, canActivate: [IsPhysicianGuard] },
  { path: 'test-result/details/:id', component: TestResultDetailsComponent, canActivate: [IsPhysicianGuard] },
  { path: 'run-test/:id', component: RunTestComponent, canActivate: [IsPhysicianGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [IsLoggedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
