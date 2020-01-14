import { NgModule } from '@angular/core';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SubCategoryDetailsComponent } from 'src/app/components/shop/sub-category/sub-category-details/sub-category-details.component';


@NgModule({
  declarations: [
    SubCategoryDetailsComponent
  ],
  imports: [
    SubCategoryRoutingModule,
    SharedModule
  ]
})
export class SubCategoryModule { }
