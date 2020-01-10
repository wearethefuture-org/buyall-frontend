import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubCategoryDetailsComponent } from 'src/app/components/shop/sub-category/sub-category-details/sub-category-details.component';


const routes: Routes = [
  {
    path: ':id',
    component: SubCategoryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
