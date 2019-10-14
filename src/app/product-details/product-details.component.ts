import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { products } from '../products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product;

  constructor(private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {  
    //this.products = this.cartService.getProductsList(); 
    this.cartService.getProductsList().subscribe(( products: any[])=>{
      this.route.paramMap.subscribe(params => {
        this.product = products[+params.get('id')];
      })
    })
  }

  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
