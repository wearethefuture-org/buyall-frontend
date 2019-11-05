import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { ConfirmRegistrationComponent } from 'src/app/components/confirm-registration/confirm-registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmRegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
