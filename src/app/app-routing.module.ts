import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: "./shop.module#ShopModule"
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