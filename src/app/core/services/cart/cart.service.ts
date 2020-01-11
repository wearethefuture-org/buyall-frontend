import { Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { IOrder } from '../../interfaces/order';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private ordersSubject: BehaviorSubject<IOrder[]>;
  public orders$: Observable<IOrder[]>;

  constructor() {
    this.ordersSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('orders')) || []);
    this.orders$ = this.ordersSubject.asObservable();
  }

  get orders(): IOrder[] {
    return this.ordersSubject.value;
  }

  add(product: IProduct): void {
    const order = {
      product,
      amount: 0
    };

    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  remove(product: IProduct): void {
    const orders = this.orders.filter(order => {
      return JSON.stringify(order.product) !== JSON.stringify(product);
    });

    this.ordersSubject.next(orders);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  isAdded(product: IProduct): boolean {
    for (let order of this.orders) {
      if (JSON.stringify(order.product) === JSON.stringify(product)) {
        return true;
      }
    }

    return false;
  }

  increaseAmount(order: IOrder): void {
    order.amount += 1;
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  decreaseAmount(order: IOrder): void {
    if (order.amount === 0) {
      return;
    }

    order.amount -= 1;
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  clear(): void {
    this.ordersSubject.next([]);
    localStorage.removeItem('orders');
  }
}
