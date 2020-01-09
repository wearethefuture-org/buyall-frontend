import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from 'src/app/components/pages/shop/products/products.component';
import { MatIconModule } from '@angular/material';
import { PaginationComponent } from 'src/app/components/common/pagination/pagination.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductsComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    ProductsComponent,
    PaginationComponent,
    RouterModule,
    MatIconModule
  ]
})
export class SharedModule { }
