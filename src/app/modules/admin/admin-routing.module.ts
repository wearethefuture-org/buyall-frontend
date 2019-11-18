import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserPageComponent } from 'src/app/components/manage-user-page/manage-user-page.component';
import { ManageCategoriesPageComponent } from 'src/app/components/manage-categories-page/manage-categories-page.component';
import { ManageSubcategoriesPageComponent } from 'src/app/components/manage-subcategories-page/manage-subcategories-page.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
