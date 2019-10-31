import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ){}
  share() {
    window.alert('The product has been shared!');
  }

  ngOnInit() {
    // get products
    this.products = this.productsService.getProductsList() 
  }

  ngOnDestroy() {
    // prevent memory leak
    this.products.unsubscribe()
  }

  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/