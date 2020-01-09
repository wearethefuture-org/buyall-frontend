import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';

import { CategoryComponent } from 'src/app/components/pages/shop/category/category.component';
import { CategoriesListComponent } from 'src/app/components/pages/shop/categories-list/categories-list.component';

@NgModule({
  imports: [CommonModule, CategoryRoutingModule],
  declarations: [
    CategoryComponent,
    CategoriesListComponent
  ]
})
export class CategoryModule {}
