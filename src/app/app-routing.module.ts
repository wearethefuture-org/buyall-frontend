import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: "./modules/shop/shop.module#ShopModule"
  },
  { 
    path: 'cart', 
    component: CartComponent
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