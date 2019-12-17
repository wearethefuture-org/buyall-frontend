import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'product'
    },
    {
      path: 'category',
      loadChildren: '../category/category.module#CategoryModule'
    },
    {
      path: 'sub-category',
      loadChildren: '../sub-category/sub-category.module#SubCategoryModule'
    },
    {
      path: 'product',
      loadChildren: '../product/product.module#ProductModule'
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
