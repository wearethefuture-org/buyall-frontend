import { Component, OnDestroy, ViewChild, OnInit, ElementRef } from '@angular/core';
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
import { ISetting } from 'src/app/core/interfaces/setting';
import { IValue } from 'src/app/core/interfaces/value';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnDestroy, OnInit {
  @ViewChild('modalToggler', {static: false}) modalToggler: ElementRef;
  @ViewChild('fileInputPreview', {static: false}) fileInputPreview: ElementRef;
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  tableHeaders: string[] = ['id', 'subCategoryId', 'name', 'description', 'available',
  'amount', 'isPromotion', 'discount', 'weight', 'price', 'actions'];
  tableBody: MatTableDataSource<IProduct>;
  subCategories: ISubCategory[] = [];
  products: IProduct[] = [];
  productForm: FormGroup;
  subCategorySettings: ISetting[];
  valueSetting: ISetting;
  currentSubCategory: any = 'All';
  images = [];
  previewImage;
  mustBeDeletedImages = [];
  edit = false;
  subGetProducts: Subscription;
  subCreateProduct: Subscription;
  subDeleteProduct: Subscription;
  subEditProduct: Subscription;
  subGetSettings: Subscription;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private fieldToObjectPipe: FieldToObjectPipe,
    private subCategoriesService: SubCategoryService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {

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

  onSelectSearchSubCategory(): void {
    if (this.currentSubCategory === 'All') {
      this.tableBody = new MatTableDataSource(this.products);
      this.tableBody.sort = this.sort;
      this.tableBody.paginator = this.paginator;
      return;
    }

    const productsBySubCategory = this.products.filter((product: IProduct) => {
      return product.subCategoryId === this.currentSubCategory.id;
    });

    this.tableBody = new MatTableDataSource(productsBySubCategory);
    this.tableBody.sort = this.sort;
    this.tableBody.paginator = this.paginator;
  }

  onSelectProductSubCategory(): void {
    const subCategory: any = this.fieldToObjectPipe.transform(this.productForm.get('subCategoryId').value, 'id', this.subCategories);

    this.subCategorySettings = subCategory.characteristicsSettings;
  }

  addValue(): void {
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
    value[`${this.valueSetting.type}Value`] = this.valueSetting.type === 'boolean'
      ? [false, Validators.required]
      : [null, Validators.required];

    const options = this.valueSetting.options ? this.valueSetting.options.map((option: string) => {
      return this.fb.control(option);
    }) : [];

    value['options'] = this.fb.array(options);

    values.push(this.fb.group(value));

    this.subCategorySettings = this.subCategorySettings.filter((setting: ISetting) => {
      return setting !== this.valueSetting;
    });

    this.valueSetting = this.subCategorySettings[0];
  }

  deleteValue(mustBeDeletedValue: FormGroup): void {
    const values = this.productForm.get('characteristicsValues') as FormArray;

    values.controls = values.controls.filter((value: FormGroup) => {
      return value !== mustBeDeletedValue;
    });

    this.productForm.setControl('characteristicsValues', values);

    const subCategory: any = this.fieldToObjectPipe.transform(this.productForm.get('subCategoryId').value, 'id', this.subCategories);

    const setting: any = this.fieldToObjectPipe.transform(
      mustBeDeletedValue.value.characteristicSettingId, 'id', subCategory.characteristicsSettings);

    this.subCategorySettings.push(setting);
  }

  showCreateModal(): void {
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

    this.images = [];
    this.previewImage = null;
    this.edit = false;

    this.modalToggler.nativeElement.click();
  }

  showEditModal(product: IProduct): void {
    const body: any = {
      id: [product.id],
      name: [product.name, Validators.compose([Validators.required, Validators.maxLength(255)])],
      description: [product.description],
      subCategoryId: [product.subCategoryId, Validators.required],
      amount: [product.amount],
      discount: [product.discount],
      weight: [product.weight, Validators.required],
      price: [product.price, Validators.required],
      available: [product.available, Validators.required],
      isPromotion: [product.isPromotion, Validators.required]
    };

    const subCategory: any = this.fieldToObjectPipe.transform(product.subCategoryId, 'id', this.subCategories); // interface her

    const values = product.characteristicsValues.map((value: IValue) => {
      const setting: any = this.fieldToObjectPipe.transform(
        value.characteristicSettingId, 'id', subCategory.characteristicsSettings);

      const formValue = {
        id: [value.id, Validators.compose([Validators.required, Validators.maxLength(255)])],
        name: [value.name, Validators.compose([Validators.required, Validators.maxLength(255)])],
        type: [value.type, Validators.compose([Validators.required])],
        options: this.fb.array([]),
      };
      formValue[`${value.type}Value`] = [value[`${value.type}Value`], Validators.compose([Validators.required])];

      if (!setting.options) {
        return this.fb.group(formValue);
      }

      setting.options.forEach((option: string) => {
        formValue.options.push(this.fb.control(option));
      });

      return this.fb.group(formValue);
    });

    body.characteristicsValues = this.fb.array(values);

    this.productForm = this.fb.group(body);

    this.edit = true;
    this.previewImage = product.previewImage;
    this.images = product.images;
    this.mustBeDeletedImages = [];

    this.modalToggler.nativeElement.click();
  }

  onCreateProduct(): void {
    if (this.productForm.invalid) {
      this.toastr.error('Invalid credentials');
      this.productForm.markAllAsTouched();
      return;
    }

    const { value } = this.productForm;

    const body = new FormData();

    body.append('product', JSON.stringify(value));

    body.append('previewImage', this.previewImage);

    this.images.forEach(img => {
      body.append('images', img);
    });

    this.subCreateProduct = this.productsService.createProduct(body)
      .subscribe((product: IProduct) => {
        this.products.push(product);

        this.onSelectSearchSubCategory();

        this.toastr.success('Product created');
        this.modalToggler.nativeElement.click();
      });
  }

  onEditProduct(): void {
    if (this.productForm.invalid) {
      this.toastr.error('Invalid credentials');
      this.productForm.markAllAsTouched();
      return;
    }

    const { value } = this.productForm;

    const body = new FormData();

    body.append('product', JSON.stringify(value));

    if (this.previewImage && !this.previewImage.url) {
      body.append('previewImage', this.previewImage);
    }

    this.images.forEach(img => {
      if (img.url) {
        return;
      }

      body.append('images', img);
    });

    this.mustBeDeletedImages.forEach(img => {
      body.append('mustBeDeletedImages', JSON.stringify(img));
    });

    this.subEditProduct = this.productsService.updateProduct(body, value.id)
      .subscribe((product: IProduct) => {
        this.products = this.products.map((p: IProduct) => {
          if (product.id === p.id) {
            return product;
          }

          return p;
        });

        this.onSelectSearchSubCategory();

        this.toastr.success('Product edited');
        this.modalToggler.nativeElement.click();
      });
  }

  onDeleteProduct(mustBeDeletedProduct: IProduct): void {
    this.subDeleteProduct = this.productsService.deleteProduct(mustBeDeletedProduct.id)
      .subscribe((res: boolean) => {
        if (!res) {
          return;
        }

        this.products = this.products.filter((product: IProduct) => {
          return product.id !== mustBeDeletedProduct.id;
        });

        this.onSelectSearchSubCategory();

        this.toastr.success('Product deleated');
      });
  }

  onUploadPreview(target: HTMLInputElement) {
    this.previewImage = target.files[0];
    this.fileInputPreview.nativeElement.value = '';
  }

  updatePreviewImage({file}) {
    if (this.previewImage.url) {
      this.mustBeDeletedImages.push(this.previewImage);
    }

    this.previewImage = file;
  }

  deletePreviewImage() {
    if (this.previewImage.url) {
      this.mustBeDeletedImages.push(this.previewImage);
    }

    this.previewImage = null;
  }

  onUpload(target: HTMLInputElement) {
    this.images.push(target.files[0]);
    this.fileInput.nativeElement.value = '';
  }

  updateImage({index, file}) {
    this.images = this.images.map((img, i) => {
      if (img.url && index === i) {
        this.mustBeDeletedImages.push(img);
      }

      return index === i ? file : img;
    });
  }

  deleteImage(file) {
    this.images = this.images.filter(img => {
      if (img.url && img === file) {
        this.mustBeDeletedImages.push(img);
      }

      return img !== file;
    });
  }

  ngOnDestroy(): void {
    if (this.subGetProducts) { this.subGetProducts.unsubscribe(); }
    if (this.subCreateProduct) { this.subCreateProduct.unsubscribe(); }
    if (this.subDeleteProduct) { this.subDeleteProduct.unsubscribe(); }
    if (this.subGetSettings) { this.subGetSettings.unsubscribe(); }
    if (this.subEditProduct) { this.subEditProduct.unsubscribe(); }
  }
}
