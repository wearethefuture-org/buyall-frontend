import { NgModule } from '@angular/core';
import { ShopRoutingModule } from './shop-routing.module';

import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    ShopRoutingModule,
    SharedModule
  ],
  exports: []
})
export class ShopModule { }
