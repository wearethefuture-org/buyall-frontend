import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUserPageComponent } from 'src/app/components/manage-user-page/manage-user-page.component';
import { ManageCategoriesPageComponent } from 'src/app/components/manage-categories-page/manage-categories-page.component';
import { ManageSubcategoriesPageComponent } from 'src/app/components/manage-subcategories-page/manage-subcategories-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminTableComponent } from 'src/app/components/admin-table/admin-table.component';
import { ManageProductsComponent } from 'src/app/components/manage-products/manage-products.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { CategoryIdNamePipe } from 'src/app/core/pipe/category-id-name/category-id-name.pipe';


@NgModule({
  declarations: [
    ManageUserPageComponent,
    ManageCategoriesPageComponent,
    ManageSubcategoriesPageComponent,
    ManageProductsComponent,
    AdminTableComponent,
    CategoryIdNamePipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    FormsModule
  ]
})
export class AdminModule { }
