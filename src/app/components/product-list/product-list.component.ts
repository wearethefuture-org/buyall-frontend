import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/core/interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  subProducts: Subscription;
  products: IProduct[];

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}
  share(): void {
    window.alert('The product has been shared!');
  }

  ngOnInit(): void {
    this.subProducts = this.productsService.getProductsList()
    .subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }

  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
  }

  addToCart(product: IProduct): void {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
