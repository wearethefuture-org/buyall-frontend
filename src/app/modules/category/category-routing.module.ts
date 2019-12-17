import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from 'src/app/components/pages/shop/category/category.component';
import { CategoriesListComponent } from 'src/app/components/pages/shop/categories-list/categories-list.component';


const routes: Routes = [
    {
        path: '',
        component: CategoriesListComponent
    },
    {
        path: ':id',
        component: CategoryComponent
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CategoryRoutingModule { }
