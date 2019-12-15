import { Component, OnDestroy, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces/product';
import { Subscription } from 'rxjs';
import { SubCategoryService } from 'src/app/core/services/subCategory/sub-category.service';
import { ISubCategory } from 'src/app/core/interfaces/subCategory';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FieldToObjectPipe } from 'src/app/core/pipes/fieldToObject/field-to-object.pipe';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnDestroy, OnInit {
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 15, 25];
  tableHeaders = ['id', 'subCategoryId', 'name', 'description', 'available', 'amount', 'isPromotion', 'discount', 'weight', 'price', 'actions'];
  tableBody: MatTableDataSource<IProduct>;
  subCategories: ISubCategory[] = [];
  products: IProduct[] = [];
  productForm: FormGroup;
  subCategorySettings; // interface here and in sub category interface
  valueSetting; // interface here
  currentSubCategory: any = 'All';
  subGetProducts: Subscription;
  subCreateProduct: Subscription;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private fieldToObjectPipe: FieldToObjectPipe,
    private subCategoriesService: SubCategoryService,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [null],
      subCategoryId: [null, Validators.required],
      amount: [null],
      discount: [null],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      available: [false, Validators.required],
      isPromotion: [false, Validators.required],
      characteristicsValues: this.fb.array([])
    });

    this.subGetProducts = this.productsService.getProductsList()
      .pipe(
        switchMap((products: any) => {
          this.products = products.rows;

          this.tableBody = new MatTableDataSource(this.products);
          this.tableBody.sort = this.sort;
          this.tableBody.paginator = this.paginator;

          return this.subCategoriesService.getSubCategoriesList(); 
        })
      )
      .subscribe((subCategories: any) => {
        this.subCategories = subCategories.rows;
      });
  }

  onSelectSearchSubCategory() {
    if (this.currentSubCategory === 'All') {
      this.tableBody = new MatTableDataSource(this.products);
      this.tableBody.sort = this.sort;
      this.tableBody.paginator = this.paginator;
      return;
    }

    const productsBySubCategory = this.products.filter(product => {
      return product.subCategoryId === this.currentSubCategory.id;
    });

    this.tableBody = new MatTableDataSource(productsBySubCategory);
    this.tableBody.sort = this.sort;
    this.tableBody.paginator = this.paginator;
  }

  onSelectProductSubCategory() {
    const subCategory: any = this.fieldToObjectPipe.transform(this.productForm.get('subCategoryId').value, 'id', this.subCategories);

    this.subCategorySettings = subCategory.characteristicsSettings;
  }

  onCreateProduct() {
    if (this.productForm.invalid) {
      this.toastr.error('Invalid credentials');
      this.productForm.markAllAsTouched();
      return;
    }

    this.subCreateProduct = this.productsService.createProduct(this.productForm.value)
      .subscribe((product: IProduct) => {
        this.products.push(product);
        
        this.onSelectSearchSubCategory();
      });
  }

  onDeleteProduct() {

  }

  onEditProduct() {

  }

  addValue() {
    if (!this.valueSetting) {
      this.toastr.error('Choose setting');
      return;
    }

    const values = this.productForm.get('characteristicsValues') as FormArray;

    const value = {
      name: [this.valueSetting.name],
      type: [this.valueSetting.type],
      characteristicSettingId: [this.valueSetting.id]
    };
    value[`${this.valueSetting.type}Value`] = this.valueSetting.type === 'boolean' ? [false, Validators.required] : [null, Validators.required];

    const options = this.valueSetting.options ? this.valueSetting.options.map(option => {
      return this.fb.control(option);
    }) : [];

    value['options'] = this.fb.array(options);

    values.push(this.fb.group(value));

    this.subCategorySettings = this.subCategorySettings.filter(setting => {
      return setting != this.valueSetting;
    });

    this.valueSetting = this.subCategorySettings[0];
  }

  deleteValue(mustBeDeletedValue: FormGroup) {
    const values = this.productForm.get('characteristicsValues') as FormArray;

    values.controls = values.controls.filter(value => {
      return value != mustBeDeletedValue;
    });

    this.productForm.setControl('characteristicsValues', values);

    const subCategory: any = this.fieldToObjectPipe.transform(this.productForm.get('subCategoryId').value, 'id', this.subCategories);

    const setting = this.fieldToObjectPipe.transform(mustBeDeletedValue.value.characteristicSettingId, 'id', subCategory.characteristicsSettings);

    this.subCategorySettings.push(setting);
  }

  ngOnDestroy(): void {
    if (this.subGetProducts) this.subGetProducts.unsubscribe();
    if (this.subCreateProduct) this.subCreateProduct.unsubscribe();
  }
}
