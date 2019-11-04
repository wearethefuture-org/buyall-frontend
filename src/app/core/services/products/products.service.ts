import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product';
import { BaseService } from '../base/base.service';
import { EProductUrls } from '../../enums/product.e';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  constructor(private http: HttpClient) { super(); }

  getProductById(id: number): Observable<IProduct> {
    const url = this.apiUrl + EProductUrls.productById + id;
    return this.http.get<IProduct>(url);
  }

  getProductsList(): Observable<IProduct[]> {
    const url = this.apiUrl + EProductUrls.productList;
    return this.http.get<IProduct[]>(url);
  }
}
