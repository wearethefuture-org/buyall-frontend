import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product';
import { BaseService } from '../base/base.service';
import { EProductUrls } from '../../enums/product.e';
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
    return this.get(EProductUrls.productById + id);
  }

  getProductsList(): Observable<IProduct[]> {
    return this.get(EProductUrls.productList);
  }
}
