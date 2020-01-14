import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from 'src/app/components/shop/product/product-list/product-list.component';
import { ProductDetailsComponent } from 'src/app/components/shop/product/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCardComponent } from 'src/app/components/shop/product/product-card/product-card.component';


@NgModule({
  declarations: [
    // ProductCardComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
