import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularMaterialModule } from './shared/module/angular-material/angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/authentication/verify-email/verify-email.component';
import { HeaderComponent } from './components/header/header.component';
import { ChatComponent } from './components/chat/chat.component';
import { OwnerComponent } from './components/owner/owner.component';
import { DashboardMenuComponent } from './components/dashboard/dashboard-menu/dashboard-menu.component';
import { DashboardUserListComponent } from './components/dashboard/dashboard-user-list/dashboard-user-list.component';
import { DashboardUserComponent } from './components/dashboard/dashboard-user-list/dashboard-user/dashboard-user.component';
import { ModalInfoComponent } from './components/chat/modal-info/modal-info.component';

import { AuthService } from './shared/services/authorization/auth.service';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { AuthEffects } from './components/authentication/store/effects/authentication.effects';
import { reducers } from './app.reducer';
import { SearchUserPipe } from './shared/pipes/search-user.pipe';
import { ProfileModalInfoComponent } from './components/dashboard/dashboard-menu/profile-modal-info/profile-modal-info.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    ChatComponent,
    OwnerComponent,
    DashboardMenuComponent,
    DashboardUserListComponent,
    DashboardUserComponent,
    ModalInfoComponent,
    SearchUserPipe,
    ProfileModalInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [ AuthService, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
