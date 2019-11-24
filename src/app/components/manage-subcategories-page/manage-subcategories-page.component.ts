import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ISubCategory } from 'src/app/core/interfaces/subCategory';
import { SubCategoryService } from 'src/app/core/services/subCategory/sub-category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ICategory } from 'src/app/core/interfaces/category';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

/* ************************************************
      Display name of category instead of id
   ************************************************ */
@Component({
  selector: 'app-manage-subcategories-page',
  templateUrl: './manage-subcategories-page.component.html',
  styleUrls: ['./manage-subcategories-page.component.css']
})
export class ManageSubcategoriesPageComponent implements OnInit, OnDestroy {
  @ViewChild('editModalToggler', {static: false}) editModalToggler: ElementRef;
  categories: ICategory[];
  subCategories: ISubCategory[];
  createSubCategoryForm: FormGroup;
  editSubCategoryForm: FormGroup;
  editedSubCategoryId: number = undefined;
  subGetSubCategoriesList: Subscription;
  subGetCategoriesList: Subscription;
  subCreateSubCategory: Subscription;
  subEditSubCategory: Subscription;
  subDeleteSubCategory: Subscription;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoryService
  ) { }

  ngOnInit(): void {
    this.createSubCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      categoryId: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.editSubCategoryForm = this.fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      categoryId: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.subGetSubCategoriesList = this.subCategoriesService.getSubCategoriesList()
      .pipe(map((subCategories: ISubCategory[]) => {
        return subCategories.map((subCategory: ISubCategory) => {
          delete subCategory.createdAt;
          delete subCategory.updatedAt;

          return subCategory;
        });
      }))
      .subscribe((subCategories: ISubCategory[]) => {
        this.subCategories = subCategories;
      });

    this.subGetCategoriesList = this.categoriesService.getCategoriesList()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
        this.createSubCategoryForm.get('categoryId').setValue(categories[0].id);
      });
  }

  onSubCategoryCreate(): void {
    if (this.createSubCategoryForm.invalid) {
      this.toastr.error('Invalid credentials');
      return;
    }

    this.subCreateSubCategory = this.subCategoriesService.createSubCategory(this.createSubCategoryForm.value)
      .subscribe((subCategory: ISubCategory) => {
        this.subCategories.push(subCategory);
        this.createSubCategoryForm.reset();
      });
  }

  onSubCategoryDelete(subCategory: ISubCategory): void {
    this.subDeleteSubCategory = this.subCategoriesService.deleteSubCategory(subCategory.id)
      .subscribe((res: boolean) => {
        if (res) {
          this.subCategories = this.subCategories.filter((s: ISubCategory) => {
            return s.id !== subCategory.id;
          });
        }
      });
  }

  onSubCategoryEdit(): void {
    if (this.editSubCategoryForm.invalid) {
      this.toastr.error('Invalid credentials');
      return;
    }

    this.subEditSubCategory = this.subCategoriesService.editSubCategory(
      this.editSubCategoryForm.value,
      this.subCategories[this.editedSubCategoryId].id
    )
      .subscribe((res: boolean) => {
        if (res) {
          this.editSubCategoryForm.value.id = this.subCategories[this.editedSubCategoryId].id;
          this.subCategories[this.editedSubCategoryId] = this.editSubCategoryForm.value;
        }
      });
  }

  showEditModal(subCategory: ISubCategory): void {
    this.editSubCategoryForm.setValue(subCategory);
    this.editModalToggler.nativeElement.click();
  }


  get tableHeaders(): string[] {
    return Object.keys(this.subCategories[0]);
  }

  ngOnDestroy(): void {
    if (this.subCreateSubCategory) {
      this.subCreateSubCategory.unsubscribe();
    }

    if (this.subEditSubCategory) {
      this.subEditSubCategory.unsubscribe();
    }

    if (this.subGetSubCategoriesList) {
      this.subGetSubCategoriesList.unsubscribe();
    }

    if (this.subGetCategoriesList) {
      this.subGetCategoriesList.unsubscribe();
    }

    if (this.subDeleteSubCategory) {
      this.subDeleteSubCategory.unsubscribe();
    }
  }
}
