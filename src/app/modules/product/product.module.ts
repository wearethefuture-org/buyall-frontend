import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from 'src/app/components/pages/shop/product-list/product-list.component';
import { ProductDetailsComponent } from 'src/app/components/pages/shop/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
