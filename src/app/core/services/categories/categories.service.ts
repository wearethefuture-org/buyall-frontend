import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService {

  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }

  getCategoryById(id: number): Observable<ICategory> {
    return this.get(`/category/${id}`);
  }

  getCategoriesList(): Observable<ICategory[]> {
    return this.get('/categories');
  }

  createCategory(category: ICategory): Observable<ICategory> {
    return this.post(category, '/category/');
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.delete(`/category/${id}`);
  }

  editCategory(category: ICategory, id: number): Observable<boolean> {
    return this.put(category, `/category/${id}`);
  }
}
