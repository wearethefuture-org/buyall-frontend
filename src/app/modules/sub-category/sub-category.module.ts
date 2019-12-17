import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryComponent } from 'src/app/components/pages/shop/sub-category/sub-category.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SubCategoryComponent
  ],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    SharedModule
  ]
})
export class SubCategoryModule { }
