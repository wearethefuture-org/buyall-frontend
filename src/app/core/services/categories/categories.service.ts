import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoryById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3004/category/${id}`) 
  }

  getCategoriesList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3004/categories');
  }
}
