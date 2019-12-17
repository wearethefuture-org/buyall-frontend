import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ICategory } from 'src/app/core/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-categories-page',
  templateUrl: './manage-categories-page.component.html',
  styleUrls: ['./manage-categories-page.component.scss']
})
export class ManageCategoriesPageComponent implements OnInit, OnDestroy {
  @ViewChild('editModalToggler', {static: false}) editModalToggler: ElementRef;
  categories: ICategory[];
  createCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  subCreateCategory: Subscription;
  subEditCategory: Subscription;
  subDeleteCategory: Subscription;
  subGetCategoriesList: Subscription;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.createCategoryForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.editCategoryForm = this.fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])]
    });

    this.subGetCategoriesList = this.categoriesService.getCategoriesList()
      .pipe(map((categories: ICategory[]) => {
        return categories.map((category: ICategory) => {
          delete category.subCategories;
          delete category.createdAt;
          delete category.updatedAt;

          return category;
        });
      }))
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
      });
  }

  onCategoryCreate(): void {
    if (this.editCategoryForm.invalid) {
      this.toastr.error('Invalid credentials');
      return;
    }

    this.subCreateCategory = this.categoriesService.createCategory(this.createCategoryForm.value)
      .subscribe((category: ICategory) => {
        this.categories.push(category);
        this.createCategoryForm.reset();
      });
  }

  onCategoryDelete(category: ICategory): void {
    this.subDeleteCategory = this.categoriesService.deleteCategory(category.id)
      .subscribe((res: boolean) => {
        if (res) {
          this.categories = this.categories.filter((c: ICategory) => {
            return c.id !== category.id;
          });
        }
      });
  }

  onCategoryEdit(): void {
    if (this.editCategoryForm.invalid) {
      this.toastr.error('Invalid credentials');
      return;
    }

    this.subEditCategory = this.categoriesService.editCategory(this.editCategoryForm.value, this.editCategoryForm.value.id)
      .subscribe((res: boolean) => {
        if (res) {
          this.categories = this.categories.map((category: ICategory) => {
            if (category.id === this.editCategoryForm.value.id) {
              return this.editCategoryForm.value;
            }
            return category;
          });
        }
      });
  }

  showEditModal(category: ICategory): void {
    this.editCategoryForm.setValue(category);
    this.editModalToggler.nativeElement.click();
  }

  get tableHeaders(): string[] {
    return Object.keys(this.categories[0]);
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
