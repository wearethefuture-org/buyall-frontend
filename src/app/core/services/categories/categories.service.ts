import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { ECategoryUrls } from '../../enums/category.e';
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
    return this.get(ECategoryUrls.categoryById + id);
  }

  getCategoriesList(): Observable<ICategory[]> {
    return this.get(ECategoryUrls.categoryList);
  }
}
