import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/pages/shop/cart/cart.component';
import { NotFoundComponent } from './components/pages/site/not-found/not-found.component';
import {ContactUsComponent} from './components/pages/site/contact-us/contact-us.component';
import {AboutComponent} from './components/pages/site/about/about.component';
import { TopbarLayoutComponent } from './components/layouts/topbar-layout/topbar-layout.component';
import { SidebarLayoutComponent } from './components/layouts/sidebar-layout/sidebar-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TopbarLayoutComponent,
    children: [
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: 'contact',
        component: ContactUsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  },
  {
    path: 'shop',
    component: TopbarLayoutComponent,
    loadChildren: './modules/shop/shop.module#ShopModule'
  },
  {
    path: 'auth',
    component: TopbarLayoutComponent,
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    component: SidebarLayoutComponent,
    loadChildren: './modules/admin/admin.module#AdminModule'
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
