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

@Component({
  selector: 'app-manage-subcategories-page',
  templateUrl: './manage-subcategories-page.component.html',
  styleUrls: ['./manage-subcategories-page.component.css']
})
export class ManageSubcategoriesPageComponent implements OnInit, OnDestroy {
  @ViewChild('editModalToggler', {static: false}) editModalToggler: ElementRef;
  @ViewChild('createModalToggler', {static: false}) createModalToggler: ElementRef;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 15, 25];
  tableBody: MatTableDataSource<ISubCategory>;
  tableHeaders = ['id', 'categoryId', 'name', 'description', 'actions'];
  characteristicsTypes = ['string', 'boolean', 'integer', 'float', 'date', 'enum'];
  categories: ICategory[];
  subCategories: ISubCategory[];
  createSubCategoryForm: FormGroup;
  // editSubCategoryForm: FormGroup;
  // editedSubCategoryId: number = undefined;
  subGetCategories: Subscription;
  subCreateSubCategory: Subscription;
  subDeleteSubCategory: Subscription;
  // subEditSubCategory: Subscription;

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

    // this.editSubCategoryForm = this.fb.group({
    //   id: [null],
    //   name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
    //   categoryId: [null, Validators.compose([Validators.required])],
    //   description: [null, Validators.compose([Validators.maxLength(255)])],
    //   img: [null, Validators.compose([Validators.required])]
    // });

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

  addCharacteristic(fg: FormGroup) {
    const characteristics = fg.get('characteristicsSettings') as FormArray;

    characteristics.push(
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

  deleteCharacteristic(fg: FormGroup, mustBeDeletedCharacteristic: FormGroup) {
    const characteristics = fg.get('characteristicsSettings') as FormArray;

    characteristics.controls = characteristics.controls.filter(characteristic => {
      return characteristic != mustBeDeletedCharacteristic;
    });
  }

  addOption(fg: FormGroup) {
    const options = fg.get('options') as FormArray;

    options.push(this.fb.control(null, Validators.compose([Validators.required])));
  }

  deleteOption(fg: FormGroup, mustBeDeletedOption: FormControl) {
    const options = fg.get('options') as FormArray;

    options.controls = options.controls.filter(option => {
      return option != mustBeDeletedOption;
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
      });
  }

  // onSubCategoryEdit(): void {
  //   if (this.editSubCategoryForm.invalid) {
  //     this.toastr.error('Invalid credentials');
  //     return;
  //   }

  //   this.subEditSubCategory = this.subCategoriesService.editSubCategory(
  //     this.editSubCategoryForm.value,
  //     this.subCategories[this.editedSubCategoryId].id
  //   )
  //     .subscribe((res: boolean) => {
  //       if (res) {
  //         this.editSubCategoryForm.value.id = this.subCategories[this.editedSubCategoryId].id;
  //         this.subCategories[this.editedSubCategoryId] = this.editSubCategoryForm.value;
  //       }
  //     });
  // }

  // showEditModal(subCategory: ISubCategory): void {
  //   const body = Object.assign({}, subCategory);

  //   delete body.createdAt;
  //   delete body.updatedAt;
  //   delete body.characteristicsSettings;

  //   this.editSubCategoryForm.setValue(body);
  //   this.editModalToggler.nativeElement.click();
  // }

  ngOnDestroy(): void {
    if (this.subGetCategories) this.subGetCategories.unsubscribe();
    if (this.subCreateSubCategory) this.subCreateSubCategory.unsubscribe();
    if (this.subDeleteSubCategory) this.subDeleteSubCategory.unsubscribe();

    // if (this.subEditSubCategory) {
    //   this.subEditSubCategory.unsubscribe();
    // }
  }
}
