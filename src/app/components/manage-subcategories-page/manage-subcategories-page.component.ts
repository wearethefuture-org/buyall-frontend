import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubCategory } from 'src/app/core/interfaces/subCategory';
import { SubCategoryService } from 'src/app/core/services/subCategory/sub-category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ICategory } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-manage-subcategories-page',
  templateUrl: './manage-subcategories-page.component.html',
  styleUrls: ['./manage-subcategories-page.component.css']
})
export class ManageSubcategoriesPageComponent implements OnInit, OnDestroy {
  categories: ICategory[];
  subCategories: ISubCategory[];
  createSubCategoryForm: FormGroup;
  editSubCategoryForm: FormGroup;
  editedSubCategoryId: number = undefined;
  subCreateSubCategory: Subscription;
  subEditSubCategory: Subscription;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoryService
  ) { }

  ngOnInit() {

    this.createSubCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      categoryId: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.editSubCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      categoryId: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.subCategoriesService.getSubCategoriesList()
      .subscribe(subCategories => {
        this.subCategories = subCategories;
      })

    this.categoriesService.getCategoriesList()
      .subscribe(categories => {
        this.categories = categories;
        this.createSubCategoryForm.get('categoryId').setValue(categories[0].id);
      })
  }

  ngOnDestroy() {
    if (this.subCreateSubCategory) {
      this.subCreateSubCategory.unsubscribe();
    }

    if (this.subEditSubCategory) {
      this.subEditSubCategory.unsubscribe();
    }
  }

  onSubCategoryCreate() {
    this.subCategoriesService.createCategory(this.createSubCategoryForm.value)
      .subscribe(subCategory => {
        this.subCategories.push(subCategory);
        this.createSubCategoryForm.reset();
      })
  }

  onSubCategoryDelete(subCategory: ISubCategory) {
    this.subCategoriesService.deleteCategory(subCategory.id)
      .subscribe(res => {
        if (res) {
          this.subCategories = this.subCategories.filter(s => {
            return s.id != subCategory.id;
          }) 
        }
      })
  }

  onInviteEdit(id: number) {
    this.editedSubCategoryId = id;

    const {
      name,
      categoryId,
      description
    } = this.subCategories[id];

    this.editSubCategoryForm.setValue({
      name,
      categoryId,
      description
    });
  }

  onSubCategoryEdit() {
    this.categoriesService.editCategory(this.editSubCategoryForm.value, this.subCategories[this.editedSubCategoryId].id)
      .subscribe(res => {
        if (res) {
          this.editSubCategoryForm.value.id = this.categories[this.editedSubCategoryId].id;
          this.subCategories[this.editedSubCategoryId] = this.editSubCategoryForm.value;
        }
      })
  }
}
