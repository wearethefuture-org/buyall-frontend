import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { CategoriesListComponent } from 'src/app/components/categories-list/categories-list.component';


const routes: Routes = [
    {
        path: '',
        component: CategoryComponent
    },
    {
        path: 'all',
        component: CategoriesListComponent
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CategoryRoutingModule { }
