import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ICategory } from 'src/app/core/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-categories-page',
  templateUrl: './manage-categories-page.component.html',
  styleUrls: ['./manage-categories-page.component.css']
})
export class ManageCategoriesPageComponent implements OnInit, OnDestroy {
  @ViewChild('editModal', {static: false}) editModal: ElementRef;
  categories: ICategory[];
  createCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
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

  onCategoryEdit(): void {
    // need refactoring if block
    // add alert if category is edited
    if (this.editCategoryForm.valid) {
      this.subEditCategory = this.categoriesService.editCategory(this.editCategoryForm.value, this.editCategoryForm.value.id)
        .subscribe((res: boolean) => {
          if (res) {
            this.categories = this.categories.map((category: ICategory) => {
              if (category.id === this.editCategoryForm.value.id) {
                return this.editCategoryForm.value;
              } 
              return category;
            })
          }
        });
    }
  }

  showEditModal(category: ICategory): void {
    this.editCategoryForm.setValue(category); 
    // $(this.editModal.nativeElement).modal('show'); 
    // $(this.editModal.nativeElement).show(); 
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
