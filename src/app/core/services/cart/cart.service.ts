import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { IProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {
  items: IProduct[] = [];

  constructor() { super(); }
  addToCart(product: IProduct): void {
    this.items.push(product);
  }

  getItems(): IProduct[] {
    return this.items;
  }

  clearCart(): IProduct[] {
    this.items = [];
    return this.items;
  }
}
