import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/core/interfaces/product';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ICategory } from 'src/app/core/interfaces/category';
import { ActivatedRoute, Params, Router } from '@angular/router';
import makePagination from 'src/app/core/helpers/makePagination';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  subProducts: Subscription;
  subCategories: Subscription;
  subParams: Subscription;
  products: IProduct[];
  categories: ICategory[];
  page: number;
  pages: any[];
  limit: number;

  constructor(
    private cartService: CartService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.page = 1;
    this.pages = [];
    this.limit = 10;
  }

  share(): void {
    window.alert('The product has been shared!');
  }

  ngOnInit(): void {
    this.subParams = this.route.queryParams.subscribe((params: Params) => {
      if (!+params.page ||  +params.page < 1) {
        this.router.navigate([], {queryParams: {page: 1}});
      }
      this.page = +params.page;

      const offset = this.page * this.limit - this.limit;

      this.subProducts = this.productsService.getProductsList(offset, this.limit)
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

    this.subCategories = this.categoriesService.getCategoriesList()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
    this.subCategories.unsubscribe();
    this.subParams.unsubscribe();
  }

  addToCart(product: IProduct): void {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
