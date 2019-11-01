import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { products } from '../products';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
  subParams: Subscription 
  subProduct: Subscription 
  product;

  constructor(
    private route: ActivatedRoute, 
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {  
    this.subParams = this.route.params.subscribe(params => {
      // product id
      const id = +params['id'] 

      // get product data
      this.subProduct = this.productsService.getProductById(id)
        .subscribe((product: IProduct) => {
          this.product = product
        })
    })
  }

  ngOnDestroy() {
    // prevent memory leak
    this.subProduct.unsubscribe()
    this.subParams.unsubscribe()
  }

  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
