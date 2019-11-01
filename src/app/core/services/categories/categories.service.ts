import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoryById(id: number) {
    return this.http.get(`http://localhost:3004/category/${id}`) 
  }

  getCategoriesList() {
    return this.http.get('http://localhost:3004/categories');
  }
}
