import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserPageComponent } from 'src/app/components/pages/admin/manage-user-page/manage-user-page.component';
import { ManageCategoriesPageComponent } from 'src/app/components/pages/admin/manage-categories-page/manage-categories-page.component';
import { ManageSubcategoriesPageComponent } from 'src/app/components/pages/admin/manage-subcategories-page/manage-subcategories-page.component';
import { ManageProductsComponent } from 'src/app/components/pages/admin/manage-products/manage-products.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: ManageUserPageComponent
  },
  {
    path: 'categories',
    component: ManageCategoriesPageComponent
  },
  {
    path: 'subCategories',
    component: ManageSubcategoriesPageComponent
  },
  {
    path: 'products',
    component: ManageProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
