import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SecureInnerPagesGuard } from './shared/guards/secure-inner-pages.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent , data: {state: 'login'}, canActivate: [SecureInnerPagesGuard]},
  {path: 'register-user', component: SignUpComponent, data: {state: 'registration'},  canActivate: [SecureInnerPagesGuard]},
  {path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: {state: 'reset'}, canActivate: [SecureInnerPagesGuard]},
  {path: 'verify-email-address', component: VerifyEmailComponent, data: {state: 'verify'}, canActivate: [SecureInnerPagesGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
