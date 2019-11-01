import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService{

  constructor(private http: HttpClient) {super()}

  getCategoryById(id: number): Observable<ICategory>{
    return this.http.get<ICategory>(`${this.apiUrl}/category/${id}`) 
  }

  getCategoriesList(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${this.apiUrl}/categories`);
  }
}
