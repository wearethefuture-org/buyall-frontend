import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ESubCategoryUrls } from '../../enums/subCategory.e';
import { ISubCategory } from '../../interfaces/subCategory';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService {
  constructor(
    public router: Router,
    http: HttpClient
  ) { super(router, http); }

  getSubCategoriesList(): Observable<ISubCategory[]> {
    return this.get(ESubCategoryUrls.subCategoryList);
  }

  createSubCategory(subCategory: ISubCategory): Observable<ISubCategory> {
    return this.post(subCategory, ESubCategoryUrls.create);
  }

  deleteSubCategory(id: number): Observable<boolean> {
    return this.delete(ESubCategoryUrls.delete + id);
  }

  editSubCategory(subCategory: ISubCategory, id: number): Observable<boolean> {
    return this.put(subCategory, ESubCategoryUrls.update + id);
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
