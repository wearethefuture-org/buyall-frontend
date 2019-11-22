import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICategory } from 'src/app/core/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-manage-categories-page',
  templateUrl: './manage-categories-page.component.html',
  styleUrls: ['./manage-categories-page.component.css']
})
export class ManageCategoriesPageComponent implements OnInit, OnDestroy {
  categories: ICategory[];
  createCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  editedCategoryId: number = undefined;
  subCreateCategory: Subscription;
  subEditCategory: Subscription;
  subDeleteCategory: Subscription;
  subGetCategoriesList: Subscription;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.createCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.editCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.subGetCategoriesList = this.categoriesService.getCategoriesList()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
      });
  }

  onCategoryCreate(): void {
    // need refactoring if block
    // alert if category is created
    if (this.createCategoryForm.valid) {
      this.subCreateCategory = this.categoriesService.createCategory(this.createCategoryForm.value)
        .subscribe((category: ICategory) => {
          this.categories.push(category);
          this.createCategoryForm.reset();
        });
    }
  }

  onCategoryDelete(category: ICategory): void {
    // delete categories on serve with sub categories
    // alert if category is deleted
    this.subDeleteCategory = this.categoriesService.deleteCategory(category.id)
      .subscribe((res: boolean) => {
        if (res) {
          this.categories = this.categories.filter((c: ICategory) => {
            return c.id !== category.id;
          });
        }
      });
  }

  onInviteEdit(id: number): void {
    // look agly create component category-list-item where manage changes
    this.editedCategoryId = id;

    // need refactoring
    const {
      name,
      description
    } = this.categories[id];

    this.editCategoryForm.setValue({
      name,
      description
    });
  }

  onCategoryEdit(): void {
    // need refactoring if block
    // add alert if category is edited
    if (this.editCategoryForm.valid) {
      this.subEditCategory = this.categoriesService.editCategory(this.editCategoryForm.value, this.categories[this.editedCategoryId].id)
        .subscribe((res: boolean) => {
          if (res) {
            this.editCategoryForm.value.id = this.categories[this.editedCategoryId].id;
            this.categories[this.editedCategoryId] = this.editCategoryForm.value;
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subCreateCategory) {
      this.subCreateCategory.unsubscribe();
    }

    if (this.subEditCategory) {
      this.subEditCategory.unsubscribe();
    }

    if (this.subDeleteCategory) {
      this.subDeleteCategory.unsubscribe();
    }

    if (this.subGetCategoriesList) {
      this.subGetCategoriesList.unsubscribe();
    }
  }
}
