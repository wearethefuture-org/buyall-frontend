import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/pages/auth/login/login.component';
import { ConfirmRegistrationComponent } from 'src/app/components/pages/auth/confirm-registration/confirm-registration.component';
import { RegisterComponent } from 'src/app/components/pages/auth/register/register.component';
import { ForgotPasswordComponent } from 'src/app/components/pages/auth/forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
  {
    path: 'confirm/:key',
    component: ConfirmRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
