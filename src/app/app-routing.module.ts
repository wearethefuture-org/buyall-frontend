import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
  {
    path: "",
    component: ProductListComponent
  },
  {
    path: "category",
    loadChildren: "../app/category/category.module#CategoryModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}