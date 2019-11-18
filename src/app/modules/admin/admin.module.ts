import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUserPageComponent } from 'src/app/components/manage-user-page/manage-user-page.component';
import { ManageCategoriesPageComponent } from 'src/app/components/manage-categories-page/manage-categories-page.component';
import { ManageSubcategoriesPageComponent } from 'src/app/components/manage-subcategories-page/manage-subcategories-page.component';


@NgModule({
  declarations: [
    ManageUserPageComponent,
    ManageCategoriesPageComponent,
    ManageSubcategoriesPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
