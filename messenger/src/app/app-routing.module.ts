import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/authentication/verify-email/verify-email.component';
import { SecureInnerPagesGuard } from './shared/guards/secure-inner-pages.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { OwnerComponent } from './components/owner/owner.component';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent , data: {state: 'login'}, canActivate: [SecureInnerPagesGuard]},
  {path: 'register-user', component: SignUpComponent, data: {state: 'registration'},  canActivate: [SecureInnerPagesGuard]},
  {path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: {state: 'reset'}, canActivate: [SecureInnerPagesGuard]},
  {path: 'verify-email-address', component: VerifyEmailComponent, data: {state: 'verify'}, canActivate: [SecureInnerPagesGuard]},
  {path: 'owner', component: OwnerComponent, data: {state: 'verify'},  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
