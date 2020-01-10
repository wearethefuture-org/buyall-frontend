import { NgModule } from '@angular/core';
import { CategoryRoutingModule } from './category-routing.module';

import { CategoriesListComponent } from 'src/app/components/shop/category/categories-list/categories-list.component';
import { CategoryDetailsComponent } from 'src/app/components/shop/category/category-details/category-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CategoryRoutingModule,
    SharedModule
  ],
  declarations: [
    CategoryDetailsComponent,
    CategoriesListComponent
  ]
})
export class CategoryModule {}
