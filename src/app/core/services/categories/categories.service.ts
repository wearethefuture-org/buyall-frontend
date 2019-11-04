import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { ECategoryUrls } from '../../enums/category.e';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  getCategoryById(id: number): Observable<ICategory> {
    const url = this.apiUrl + ECategoryUrls.categoryById + id;
    return this.http.get<ICategory>(url);
  }

  getCategoriesList(): Observable<ICategory[]> {
    const url = this.apiUrl + ECategoryUrls.categoryList;
    return this.http.get<ICategory[]>(url);
  }
}
