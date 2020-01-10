import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { IProduct } from '../../interfaces/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orders: IOrder[];

  constructor() {
    this.orders = JSON.parse(localStorage.getItem('orders')) || [];    
  }

  add(product: IProduct): void {
    const order = {
      product,
      amount: 0
    };

    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getItems() {
    // return this.items;
  }

  clearCart() {
    // this.items = [];
    // return this.items;
  }
}
