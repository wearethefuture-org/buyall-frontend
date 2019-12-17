import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoryComponent } from 'src/app/components/pages/shop/sub-category/sub-category.component';


const routes: Routes = [
  {
    path: ':id',
    component: SubCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
