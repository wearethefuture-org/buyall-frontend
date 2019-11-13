import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { IProduct } from '../../interfaces/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {
  items: IProduct[] = [];

  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }
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
