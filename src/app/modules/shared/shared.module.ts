import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from 'src/app/components/pages/shop/products/products.component';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
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
    MatIconModule,
    MatSidenavModule
  ],
  exports: [
    ProductsComponent,
    PaginationComponent,
    RouterModule,
    MatIconModule,
    MatSidenavModule
  ]
})
export class SharedModule { }
