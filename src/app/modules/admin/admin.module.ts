import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUserPageComponent } from 'src/app/components/pages/admin/manage-user-page/manage-user-page.component';
import { ManageCategoriesPageComponent } from 'src/app/components/pages/admin/manage-categories-page/manage-categories-page.component';
import { ManageSubcategoriesPageComponent } from 'src/app/components/pages/admin/manage-subcategories-page/manage-subcategories-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminTableComponent } from 'src/app/components/pages/admin/admin-table/admin-table.component';
import { ManageProductsComponent } from 'src/app/components/pages/admin/manage-products/manage-products.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { IdToNamePipe } from 'src/app/core/pipes/id-to-name/id-to-name.pipe';
import { FieldToObjectPipe } from 'src/app/core/pipes/fieldToObject/field-to-object.pipe';


@NgModule({
  declarations: [
    ManageUserPageComponent,
    ManageCategoriesPageComponent,
    ManageSubcategoriesPageComponent,
    ManageProductsComponent,
    AdminTableComponent,
    IdToNamePipe,
    FieldToObjectPipe
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
  ],
  providers: [FieldToObjectPipe]
})
export class AdminModule { }
