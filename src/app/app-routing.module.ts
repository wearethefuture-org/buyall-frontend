import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {AboutComponent} from './components/about/about.component';
import { HomePageComponent } from './components/home-page/home-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'shop',
    loadChildren: './modules/shop/shop.module#ShopModule'
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
