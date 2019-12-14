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
  pageSizeOptions = [5, 10, 15, 25];
  tableHeaders = ['id', 'subCategoryId', 'name', 'description', 'available', 'amount', 'isPromotion', 'discount', 'weight', 'price', 'actions'];
  tableBody: MatTableDataSource<IProduct>;
  subCategories: ISubCategory[] = [];
  products: IProduct[] = [];
  currentSubCategory: any = 'All';
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

          this.tableBody = new MatTableDataSource(this.products);
          this.tableBody.sort = this.sort;
          this.tableBody.paginator = this.paginator;

          return this.subCategoriesService.getSubCategoriesList(); 
        })
      )
      .subscribe((subCategories: any) => {
        this.subCategories = subCategories.rows;
      });
  }

  onSelectChanges() {
    if (this.currentSubCategory === 'All') {
      this.tableBody = new MatTableDataSource(this.products);
      return;
    }

    const productsBySubCategory = this.products.filter(product => {
      return product.subCategoryId === this.currentSubCategory.id;
    });

    this.tableBody = new MatTableDataSource(productsBySubCategory);
  }

  ngOnDestroy(): void {
    if (this.subGetProducts) this.subGetProducts.unsubscribe();
  }
}
