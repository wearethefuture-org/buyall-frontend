import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ISubCategory } from 'src/app/core/interfaces/subCategory';
import { SubCategoryService } from 'src/app/core/services/subCategory/sub-category.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ICategory } from 'src/app/core/interfaces/category';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ISetting } from 'src/app/core/interfaces/setting';

@Component({
  selector: 'app-manage-subcategories-page',
  templateUrl: './manage-subcategories-page.component.html',
  styleUrls: ['./manage-subcategories-page.component.scss']
})
export class ManageSubcategoriesPageComponent implements OnInit, OnDestroy {
  @ViewChild('editModalToggler', {static: false}) editModalToggler: ElementRef;
  @ViewChild('createModalToggler', {static: false}) createModalToggler: ElementRef;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  tableBody: MatTableDataSource<ISubCategory>;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  tableHeaders: string[] = ['id', 'categoryId', 'name', 'description', 'actions'];
  characteristicsTypes: string[] = ['string', 'boolean', 'integer', 'float', 'date', 'enum'];
  categories: ICategory[];
  subCategories: ISubCategory[];
  createSubCategoryForm: FormGroup;
  editSubCategoryForm: FormGroup;
  subGetCategories: Subscription;
  subCreateSubCategory: Subscription;
  subDeleteSubCategory: Subscription;
  subEditSubCategory: Subscription;

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
      description: [null, Validators.compose([Validators.maxLength(255)])],
      characteristicsSettings: this.fb.array([])
    });

    this.subGetCategories = this.categoriesService.getCategoriesList()
      .pipe(
        switchMap((categories: ICategory[]) => {
          this.categories = categories;
          this.createSubCategoryForm.get('categoryId').setValue(categories[0].id);

          return this.subCategoriesService.getSubCategoriesList();
        })
      )
      .subscribe((subCategories: any) => {
        this.subCategories = subCategories.rows;

        this.tableBody = new MatTableDataSource(this.subCategories);
        this.tableBody.sort = this.sort;
        this.tableBody.paginator = this.paginator;
      });
  }

  addSetting(fg: FormGroup): void {
    const settings = fg.get('characteristicsSettings') as FormArray;

    settings.push(
      this.fb.group({
        name: ['Characteristic', Validators.compose([Validators.required, Validators.maxLength(255)])],
        type: ['string', Validators.compose([Validators.required])],
        description: [null, Validators.compose([Validators.maxLength(255)])],
        options: this.fb.array([]),
        minOption: [null],
        maxOption: [null]
      })
    );
  }

  deleteSetting(fg: FormGroup, mustBeDeletedSetting: FormGroup): void {
    const settings = fg.get('characteristicsSettings') as FormArray;

    settings.controls = settings.controls.filter((setting: FormGroup) => {
      return setting !== mustBeDeletedSetting;
    });

    fg.setControl('characteristicsSettings', settings);
  }

  addOption(fg: FormGroup): void {
    const options = fg.get('options') as FormArray;

    options.push(this.fb.control(null, Validators.compose([Validators.required])));
  }

  deleteOption(fg: FormGroup, settingOfOption: FormGroup, mustBeDeletedOption: FormControl): void {
    const settings = fg.get('characteristicsSettings') as FormArray;

    const options = settingOfOption.get('options') as FormArray;

    options.controls = options.controls.filter((option: FormControl) => {
      return option !== mustBeDeletedOption;
    });

    fg.setControl('characteristicsSettings', settings);
  }

  onSubCategoryCreate(): void {
    if (this.createSubCategoryForm.invalid) {
      this.toastr.error('Invalid credentials');
      this.createSubCategoryForm.markAllAsTouched();
      return;
    }

    this.subCreateSubCategory = this.subCategoriesService.createSubCategory(this.createSubCategoryForm.value)
      .subscribe((subCategory: ISubCategory) => {
        this.subCategories.push(subCategory);
        this.tableBody = new MatTableDataSource(this.subCategories);
        this.toastr.success('Sub category created');
        this.createModalToggler.nativeElement.click();
      });
  }

  onSubCategoryDelete(mustBeDeletedSubCategory: ISubCategory): void {
    this.subDeleteSubCategory = this.subCategoriesService.deleteSubCategory(mustBeDeletedSubCategory.id)
      .subscribe((res: boolean) => {
        if (!res) {
          return;
        }

        this.subCategories = this.subCategories.filter((subCategory: ISubCategory) => {
          return subCategory.id !== mustBeDeletedSubCategory.id;
        });

        this.tableBody = new MatTableDataSource(this.subCategories);
        this.toastr.success('Sub category deleated');
      });
  }

  showEditModal(subCategory: ISubCategory): void {
    const body = Object.assign({}, subCategory);

    const characteristics = new FormArray([]);

    body.characteristicsSettings.forEach((setting: ISetting) => {
      characteristics.push(
        this.fb.group({
          id: [setting.id, Validators.compose([Validators.required, Validators.maxLength(255)])],
          name: [setting.name, Validators.compose([Validators.required, Validators.maxLength(255)])],
          type: [setting.type, Validators.compose([Validators.required])],
          description: [setting.description, Validators.compose([Validators.maxLength(255)])],
          options: this.fb.array([]),
          minOption: [setting.minOption],
          maxOption: [setting.maxOption]
        })
      );

      if (!setting.options) {
        return;
      }

      const options = characteristics.controls[characteristics.controls.length - 1].get('options') as FormArray;

      setting.options.forEach((option: string) => {
        options.push(this.fb.control(option, Validators.compose([Validators.required])));
      });
    });

    this.editSubCategoryForm = this.fb.group({
      id: [body.id, Validators.compose([Validators.required])],
      name: [body.name, Validators.compose([Validators.required, Validators.maxLength(255)])],
      categoryId: [body.categoryId, Validators.compose([Validators.required])],
      description: [body.description, Validators.compose([Validators.maxLength(255)])],
      img: [body.img, Validators.compose([Validators.required])],
      characteristicsSettings: characteristics
    });

    this.editModalToggler.nativeElement.click();
  }

  onSubCategoryEdit(): void {
    if (this.editSubCategoryForm.invalid) {
      this.toastr.error('Invalid credentials');
      this.createSubCategoryForm.markAllAsTouched();
      return;
    }

    this.subEditSubCategory = this.subCategoriesService.editSubCategory(
      this.editSubCategoryForm.value,
      this.editSubCategoryForm.value.id
    )
      .subscribe((res: boolean) => {
        if (!res) {
          return;
        }

        this.subCategories = this.subCategories.map((subCategory: ISubCategory) => {
          if (subCategory.id === this.editSubCategoryForm.value.id) {
            return this.editSubCategoryForm.value;
          }

          return subCategory;
        });

        this.tableBody = new MatTableDataSource(this.subCategories);
        this.toastr.success('Sub category updated');

        this.editModalToggler.nativeElement.click();
      });
  }

  ngOnDestroy(): void {
    if (this.subGetCategories) { this.subGetCategories.unsubscribe(); }
    if (this.subCreateSubCategory) { this.subCreateSubCategory.unsubscribe(); }
    if (this.subDeleteSubCategory) { this.subDeleteSubCategory.unsubscribe(); }
    if (this.subEditSubCategory) { this.subEditSubCategory.unsubscribe(); }
  }
}
