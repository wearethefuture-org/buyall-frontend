import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient){}

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3004/product/${id}`) 
  }

  getProductsList(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:3004/products');
  }
}
