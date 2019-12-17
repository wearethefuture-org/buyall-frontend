import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubCategoryService } from 'src/app/core/services/sub-category/sub-category.service';
import { ISubCategory } from 'src/app/core/interfaces/sub-category';
import { IProduct } from 'src/app/core/interfaces/product';
import makePagination from 'src/app/core/helpers/makePagination';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit, OnDestroy {
  subQueryParams: Subscription;
  subRouteParams: Subscription;
  subProducts: Subscription;
  subGetSubCategory: Subscription;
  subCategory: ISubCategory;
  products: IProduct[];
  page: number;
  pages: any[];
  limit: number;

  constructor(
    private subCategoriesService: SubCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.page = 1;
    this.pages = [];
    this.limit = 10;
  }

  ngOnInit(): void {
    // need refactoring seperate this and make sync
    this.subRouteParams = this.route.params.subscribe((params: Params) => {
      const id = +params.id;

      this.subGetSubCategory = this.subCategoriesService.getSubCategoryById(id)
        .subscribe((subCategory: ISubCategory) => {
          if (!subCategory) {
            this.router.navigate(['/shop/category']);
          }

          this.subCategory = subCategory;

          this.subQueryParams = this.route.queryParams.subscribe((queryParams: Params) => {
            if (!+queryParams.page ||  +queryParams.page < 1) {
              this.router.navigate([], {queryParams: {page: 1}});
            }
            this.page = +queryParams.page;

            const offset = this.page * this.limit - this.limit;

            this.subProducts = this.subCategoriesService.getSubCategoryProducts(subCategory.id, offset, this.limit)
              .subscribe((products: any) => {
                if (!products.rows || !products.count) {
                  return;
                }

                this.products = products.rows;

                const amountOfPages = Math.ceil(products.count / this.limit);

                this.pages = makePagination(this.page, amountOfPages);

                if (this.page > amountOfPages) {
                  this.router.navigate([], {queryParams: {page: amountOfPages}});
                }
              });
          });
        });
    });
  }

  ngOnDestroy(): void {
    this.subRouteParams.unsubscribe();
    this.subQueryParams.unsubscribe();
    this.subGetSubCategory.unsubscribe();
    this.subProducts.unsubscribe();
  }
}
