import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces/product';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }
}
