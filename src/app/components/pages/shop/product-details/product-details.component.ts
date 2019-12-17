import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
  subParams: Subscription;
  subProduct: Subscription;
  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.subParams = this.route.params.subscribe((params: Params) => {
      const id = +params.id;

      this.subProduct = this.productsService.getProductById(id)
        .subscribe((product: IProduct) => {
          this.product = product;
        });
    });
  }

  ngOnDestroy(): void {
    this.subProduct.unsubscribe();
    this.subParams.unsubscribe();
  }

  addToCart(product: IProduct): void {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
