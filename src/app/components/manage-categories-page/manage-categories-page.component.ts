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

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.createCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.editCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.categoriesService.getCategoriesList()
      .subscribe(categories => {
        this.categories = categories;
      })
  }

  ngOnDestroy() {
    if (this.subCreateCategory) {
      this.subCreateCategory.unsubscribe();
    }

    if (this.subEditCategory) {
      this.subEditCategory.unsubscribe();
    }
  }

  onCategoryCreate() {
    this.categoriesService.createCategory(this.createCategoryForm.value)
      .subscribe(category => {
        this.categories.push(category);
        this.createCategoryForm.reset();
      })
  }

  onCategoryDelete(category: ICategory) {
    this.categoriesService.deleteCategory(category.id)
      .subscribe(res => {
        if (res) {
          this.categories = this.categories.filter(c => {
            return c.id != category.id;
          }) 
        }
      })
  }

  onInviteEdit(id: number) {
    this.editedCategoryId = id;

    const {
      name,
      description
    } = this.categories[id];

    this.editCategoryForm.setValue({
      name,
      description
    });
  }

  onUserEdit() {
    this.categoriesService.editCategory(this.editCategoryForm.value, this.categories[this.editedCategoryId].id)
      .subscribe(res => {
        if (res) {
          this.editCategoryForm.value.id = this.categories[this.editedCategoryId].id;
          this.categories[this.editedCategoryId] = this.editCategoryForm.value;
        }
      })
  }
}
