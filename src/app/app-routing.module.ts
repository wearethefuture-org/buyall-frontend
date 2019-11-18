import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {AboutComponent} from './components/about/about.component';
import { TopbarLayoutComponent } from './components/layouts/topbar-layout/topbar-layout.component';
import { SidebarLayoutComponent } from './components/layouts/sidebar-layout/sidebar-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
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
    path: 'cart',
    component: TopbarLayoutComponent,
    children: [
      {
        path: '',
        component: CartComponent
      }
    ]
  },
  {
    path: 'about',
    component: TopbarLayoutComponent,
    children: [
      {
        path: '',
        component: AboutComponent
      }
    ]
  },
  {
    path: 'contact',
    component: TopbarLayoutComponent,
    children: [
      {
        path: '',
        component: ContactUsComponent
      }
    ]
  },
  {
    path: 'not-found',
    component: TopbarLayoutComponent,
    children: [
      {
        path: '',
        component: NotFoundComponent
      }
    ]
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
