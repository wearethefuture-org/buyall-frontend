import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from 'src/app/components/shop/category/categories-list/categories-list.component';
import { CategoryDetailsComponent } from 'src/app/components/shop/category/category-details/category-details.component';


const routes: Routes = [
    {
        path: '',
        component: CategoriesListComponent
    },
    {
        path: ':id',
        component: CategoryDetailsComponent
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CategoryRoutingModule { }
