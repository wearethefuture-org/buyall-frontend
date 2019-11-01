import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  constructor(private http: HttpClient) {super()}

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/product/${id}`) 
  }

  getProductsList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`);
  }
}
