import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces/product';
import { Subscription } from 'rxjs';
import { SubCategoryService } from 'src/app/core/services/subCategory/sub-category.service';
import { ISubCategory } from 'src/app/core/interfaces/subCategory';
import { AdminTableComponent } from '../admin-table/admin-table.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnDestroy, AfterViewInit {
  @ViewChild(AdminTableComponent, {static: false}) table;
  subGetSubCategories: Subscription;
  subProducts: Subscription;
  products: IProduct[];
  subCategories: ISubCategory[];
  currentSubCategory;

  constructor(
    private subCategoriesService: SubCategoryService
  ) { }

  ngAfterViewInit(): void {
    this.subGetSubCategories = this.subCategoriesService.getSubCategoriesList()
      .pipe(
        switchMap((subCategories) => {
          console.log(subCategories);
          
          this.subCategories = subCategories; 
          this.currentSubCategory = subCategories[0];
          this.table.headers = this.tableHeaders;

          return this.subCategoriesService.getSubCategoryProducts(subCategories[0].id)
        })
      )
      .subscribe((products: any) => {
        this.products = products.rows;

        this.table.body = this.tableBody;
      });
  }

  onSelectChanges() {
    this.subCategoriesService.getSubCategoryProducts(this.currentSubCategory.id)
      .subscribe((products: any) => {
        this.products = products.rows;

        this.table.headers = this.tableHeaders;
        this.table.body = this.tableBody;
      });
  }

  get tableHeaders(): string[] {
    const subCategory = Object.assign({}, this.currentSubCategory);

    const keys = this.currentSubCategory.characteristicsSettings
      .map((setting: any) => { return setting.name; });

    delete subCategory.characteristicsSettings;
    delete subCategory.createdAt;
    delete subCategory.updatedAt;

    keys.unshift.apply(keys, Object.keys(subCategory));

    return keys;
  }

  get tableBody(): IProduct[] {
    return this.products.map((product: IProduct) => {
      const productCopy = Object.assign({}, product);

      productCopy.characteristicsValues.forEach(value => {
        productCopy[value.name] = value[`${value.type}Value`] ;
      });

      delete productCopy.characteristicsValues;
      return productCopy;
    });
  }

  ngOnDestroy(): void {
    if (this.subGetSubCategories) { this.subGetSubCategories.unsubscribe(); }
    if (this.subProducts) { this.subProducts.unsubscribe(); }
  }
}
