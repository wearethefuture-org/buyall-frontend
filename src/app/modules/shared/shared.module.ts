import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';
import { PaginationComponent } from 'src/app/components/common/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from 'src/app/components/shop/product/product-card/product-card.component';

// TODO: angular material module
const SharedModules = [
  CommonModule,
  RouterModule,
  MatIconModule
]; 

const SharedComponents = [
  PaginationComponent,
  ProductCardComponent
]; 

@NgModule({
  declarations: [...SharedComponents],
  imports: [...SharedModules],
  exports: [
    ...SharedComponents,
    ...SharedModules
  ]
})
export class SharedModule { }
