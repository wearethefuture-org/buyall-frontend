import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { ProductDetailsComponent } from 'src/app/components/product-details/product-details.component';


const routes: Routes = [
    {
      path: '',
      component: ProductListComponent 
    },
    {
      path: 'shop',
      component: CategoryComponent
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
