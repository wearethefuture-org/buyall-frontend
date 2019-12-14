import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces/product';
import { Subscription } from 'rxjs';
import { SubCategoryService } from 'src/app/core/services/subCategory/sub-category.service';
import { ISubCategory } from 'src/app/core/interfaces/subCategory';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  tableHeaders = ['id', 'subCategoryId', 'name', 'description', 'available', 'amount', 'isPromotion', 'discount', 'weight', 'price', 'actions'];
  tableBody: MatTableDataSource<IProduct>;
  subCategories: ISubCategory[] = [];
  products: IProduct[] = [];
  // currentSubCategory;
  subGetProducts: Subscription;

  constructor(
    private subCategoriesService: SubCategoryService,
    private productsService: ProductsService
  ) { }

  ngAfterViewInit(): void {
    this.subGetProducts = this.productsService.getProductsList()
      .pipe(
        switchMap((products: any) => {
          this.products = products.rows;
          console.log(this.products[0]);
          

          this.tableBody = new MatTableDataSource(this.products);
          this.tableBody.sort = this.sort;
          this.tableBody.paginator = this.paginator;

          return this.subCategoriesService.getSubCategoriesList(); 
        })
      )
      .subscribe((subCategories: any) => {
        this.subCategories = subCategories.rows;
      });


    // this.subGetSubCategories = this.subCategoriesService.getSubCategoriesList()
    //   .pipe(
    //     switchMap((subCategories) => {
          // console.log(subCategories);
          
          // this.subCategories = subCategories; 
          // this.currentSubCategory = subCategories[0];
          // this.table.headers = this.tableHeaders;

          // return this.subCategoriesService.getSubCategoryProducts(subCategories[0].id)
      //   })
      // )
      // .subscribe((products: any) => {
        // this.products = products.rows;

        // this.table.body = this.tableBody;
      // });
  }

  onSelectChanges() {
    // unsibscribe
    // this.subCategoriesService.getSubCategoryProducts(this.currentSubCategory.id)
      // .subscribe((products: any) => {
        // this.products = products.rows;

        // this.table.headers = this.tableHeaders;
        // this.table.body = this.tableBody;
      // });
  }

  ngOnDestroy(): void {
    if (this.subGetProducts) this.subGetProducts.unsubscribe();
    // if (this.subGetSubCategories) { this.subGetSubCategories.unsubscribe(); }
    // if (this.subProducts) { this.subProducts.unsubscribe(); }
  }
}
