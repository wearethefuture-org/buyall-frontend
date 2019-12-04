import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';

import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ShopRoutingModule,
    MatIconModule
  ]
})
export class ShopModule { }
