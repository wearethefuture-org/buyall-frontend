import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ISubCategory } from 'src/app/core/interfaces/subCategory';
import { SubCategoryService } from 'src/app/core/services/subCategory/sub-category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ICategory } from 'src/app/core/interfaces/category';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 15, 25];
  categories: ICategory[];
  subCategories: ISubCategory[];
  createSubCategoryForm: FormGroup;
  editSubCategoryForm: FormGroup;
  editedSubCategoryId: number = undefined;
  subGetCategories: Subscription;
  subCreateSubCategory: Subscription;
  subEditSubCategory: Subscription;
  subDeleteSubCategory: Subscription;
  tableBody: MatTableDataSource<ISubCategory>;
  tableHeaders = ['id', 'categoryId', 'name', 'description', 'actions'];

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
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      img: [null, Validators.compose([Validators.required])]
    });

    this.editSubCategoryForm = this.fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      categoryId: [null, Validators.compose([Validators.required])],
      description: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      img: [null, Validators.compose([Validators.required])]
    });

    this.subGetCategories = this.categoriesService.getCategoriesList()
      .pipe(
        switchMap((categories) => {
          this.categories = categories;
          this.createSubCategoryForm.get('categoryId').setValue(categories[0].id);

          return this.subCategoriesService.getSubCategoriesList()
        })
      )
      .subscribe((subCategories: any) => {
        this.subCategories = subCategories.rows;

        this.tableBody = new MatTableDataSource(this.subCategories);
        this.tableBody.sort = this.sort;
        this.tableBody.paginator = this.paginator;
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
    const body = Object.assign({}, subCategory);

    delete body.createdAt;
    delete body.updatedAt;
    delete body.characteristicsSettings;

    this.editSubCategoryForm.setValue(body);
    this.editModalToggler.nativeElement.click();
  }

  ngOnDestroy(): void {
    if (this.subCreateSubCategory) {
      this.subCreateSubCategory.unsubscribe();
    }

    if (this.subEditSubCategory) {
      this.subEditSubCategory.unsubscribe();
    }

    if (this.subGetCategories) {
      this.subGetCategories.unsubscribe();
    }

    if (this.subDeleteSubCategory) {
      this.subDeleteSubCategory.unsubscribe();
    }
  }
}
