import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';

import { CategoryComponent } from '../../components/category/category.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ShopRoutingModule,
  ]
})
export class ShopModule { }
