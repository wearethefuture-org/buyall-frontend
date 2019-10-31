import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient){}

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3004/product/${id}`) 
  }

  getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3004/products');
  }
}