import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { IOrder } from 'src/app/core/interfaces/order';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orders: IOrder[];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.orders$
      .subscribe((orders: IOrder[]) => {
        this.orders = orders;
      });
  }
}
