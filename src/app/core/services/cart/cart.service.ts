import { Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { IOrder } from '../../interfaces/order';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {
  private ordersSubject: BehaviorSubject<IOrder[]>;
  public orders$: Observable<IOrder[]>;

  constructor(
    private authService: AuthService,
    public router: Router,
    http: HttpClient
  ) {
    super(router, http); 
    this.ordersSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('orders')) || []);
    this.orders$ = this.ordersSubject.asObservable();
  }

  get orders(): IOrder[] {
    return this.ordersSubject.value;
  }

  set orders(orders: IOrder[]) {
    this.ordersSubject.next(orders);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  add(product: IProduct): void | Observable<IOrder> {
    if (this.authService.isAuth()) {
      const order = {
        productId: product.id,
        userId: this.authService.getUser().id
      };

      this.post(order, '/order')
        .pipe(first())
        .subscribe((order: IOrder) => {
          this.orders.push(order);
          localStorage.setItem('orders', JSON.stringify(this.orders));
        });

      return;
    }

    const order = {
      product,
      productId: product.id,
      amount: 0
    };

    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  remove(product: IProduct): void {
    if (!this.authService.isAuth()) {
      const orders = this.orders.filter(order => {
        return JSON.stringify(order.product) !== JSON.stringify(product);
      });

      this.ordersSubject.next(orders);
      localStorage.setItem('orders', JSON.stringify(orders));
    }

    const orders = this.orders.filter(order => {
      if (JSON.stringify(order.product) !== JSON.stringify(product)) {
        this.delete(`/order/${order.id}`)
          .pipe(first())
          .subscribe((res: boolean) => {});

        return true;
      }

      return false;
    });

    this.ordersSubject.next(orders);
    localStorage.setItem('orders', JSON.stringify(orders));
    return;
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
    if (order.amount + 1 > order.product.amount) {
      return;
    }

    order.amount += 1;

    if (this.authService.isAuth()) {
      this.updateOrder(order);
      return;
    }

    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  decreaseAmount(order: IOrder): void {
    if (order.amount === 0) {
      return;
    }

    order.amount -= 1;

    if (this.authService.isAuth()) {
      this.updateOrder(order);
      return;
    }

    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  clear(): void {
    this.ordersSubject.next([]);
    localStorage.removeItem('orders');
  }

  private updateOrder(order) {
    this.put(order, `/order/${order.id}`)
        .pipe(first())
        .subscribe((order: IOrder) => {
          this.orders = this.orders.map(orderFromArray => {
            return orderFromArray === order ? order : orderFromArray;
          });
          localStorage.setItem('orders', JSON.stringify(this.orders));
        });
  }
}
