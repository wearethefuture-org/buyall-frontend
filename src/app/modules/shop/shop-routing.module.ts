import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';


const routes: Routes = [
    {
      path: '',
      component: ProductListComponent
    },
    {
      path: 'category',
      loadChildren: '../category/category.module#CategoryModule'
    },
    {
      path: 'products/:id',
      component: ProductDetailsComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
