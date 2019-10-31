import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { products } from '../products';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/interfaces';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
  sub_params: Subscription 
  sub_product: Subscription 
  product;

  constructor(
    private route: ActivatedRoute, 
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {  
    this.sub_params = this.route.params.subscribe(params => {
      // product id
      const id = +params['id'] 

      // get product data
      this.sub_product = this.productsService.getProductById(id)
      .subscribe((product: Product) => {
        this.product = product
      })
    })
  }

  ngOnDestroy() {
    // prevent memory leak
    this.sub_product.unsubscribe()
    this.sub_params.unsubscribe()
  }

  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
