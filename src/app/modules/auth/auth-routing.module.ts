import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ConfirmRegistrationComponent } from 'src/app/components/confirm-registration/confirm-registration.component';
import { RegisterComponent } from 'src/app/components/register/register.component';


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
    path: 'confirm',
    component: ConfirmRegistrationComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
