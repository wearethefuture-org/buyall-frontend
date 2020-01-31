import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ICategory } from 'src/app/core/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-manage-categories-page',
  templateUrl: './manage-categories-page.component.html',
  styleUrls: ['./manage-categories-page.component.scss']
})
export class ManageCategoriesPageComponent implements OnInit, OnDestroy {
  @ViewChild('editModalToggler', {static: false}) editModalToggler: ElementRef;
  @ViewChild('createModalToggler', {static: false}) createModalToggler: ElementRef;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  tableBody: MatTableDataSource<ICategory>;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  tableHeaders: string[] = ['id', 'name', 'description', 'actions'];
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
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      img: [null]
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

        this.tableBody = new MatTableDataSource(categories);
        this.tableBody.sort = this.sort;
        this.tableBody.paginator = this.paginator;
      });
  }

  onCategoryCreate(): void {
    if (this.createCategoryForm.invalid) {
      this.toastr.error('Invalid credentials');
      this.createCategoryForm.markAllAsTouched();
      return;
    }

    this.subCreateCategory = this.categoriesService.createCategory(this.createCategoryForm.value)
      .subscribe((category: ICategory) => {
        this.categories.push(category);
        this.createCategoryForm.reset();
        this.createModalToggler.nativeElement.click();
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
      this.editCategoryForm.markAllAsTouched();
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

          this.editModalToggler.nativeElement.click();
        }
      });
  }

  showEditModal(category: ICategory): void {
    this.editCategoryForm.setValue(category);
    this.editModalToggler.nativeElement.click();
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
