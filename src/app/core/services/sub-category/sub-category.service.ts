import { Injectable } from '@angular/core';
import { ISubCategory } from '../../interfaces/sub-category';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService {

  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }

  getSubCategoryById(id: number): Observable<ISubCategory> {
    return this.get(`/subCategory/${id}`);
  }

  getSubCategoryProducts(id: number, offset?: number, limit?: number): Observable<IProduct[]> {
    let url = `/subCategoryProducts/${id}?`;

    if (offset) {
      url += `offset=${offset}&`;
    }

    if (limit) {
      url += `limit=${limit}&`;
    }

    return this.get(url);
  }
}
