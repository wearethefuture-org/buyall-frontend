import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ESubCategoryUrls } from '../../enums/subCategory.e';
import { ISubCategory } from '../../interfaces/subCategory';
import { Observable } from 'rxjs';

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

  createCategory(subCategory) {
    return this.post(subCategory, ESubCategoryUrls.create);
  }

  deleteCategory(id: number) {
    return this.delete(ESubCategoryUrls.delete + id);
  }
}
