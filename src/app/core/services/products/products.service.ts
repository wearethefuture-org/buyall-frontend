import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }

  getProductById(id: number): Observable<IProduct> {
    return this.get(`/product/${id}`);
  }

  getProductsList(offset?: number, limit?: number): Observable<IProduct[]> {
    let url = '/products?';

    if (offset) {
      url += `offset=${offset}&`;
    }

    if (limit) {
      url += `limit=${limit}&`;
    }

    return this.get(url);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.post(product, '/product/');
  }

  updateProduct(product: IProduct, id: number): Observable<boolean> {
    return this.put(product, `/product/${id}`);
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.delete(`/product/${id}`);
  }
}
