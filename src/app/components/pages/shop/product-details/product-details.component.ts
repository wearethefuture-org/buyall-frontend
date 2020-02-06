import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/core/interfaces/product';
import { IFile } from 'src/app/core/interfaces/file';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit, OnDestroy {
  subParams: Subscription;
  subProduct: Subscription;
  product: IProduct;
  slideImg: number=0;
  imgSlider: boolean=false;
  allImg: IFile[];
  activeImg: IFile;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) {  }

  ngOnInit(): void {
    this.subParams = this.route.params.subscribe((params: Params) => {
      const id = +params.id;

      this.subProduct = this.productsService.getProductById(id)
        .subscribe((product: IProduct) => {
          this.product = product;
          this.allImg = [product.previewImage, ...product.images]
          this.activeImg=product.previewImage
        });
    });
  }

  setImgNumber(imgNumber: number): void{
    this.activeImg = this.allImg[imgNumber];
  }

  imgShowSlide():void{
    this.imgSlider =! this.imgSlider;
  }

  minuseSlide(){
    this.slideImg += 1;
    if(this.slideImg >= this.allImg.length){
      this.slideImg = 0;
    }
  }

  plusSlide(){
    this.slideImg-=1;
    if(this.slideImg <= 0){
      this.slideImg = this.allImg.length;
    }
  }
  
  ngOnDestroy(): void {
    this.subProduct.unsubscribe();
    this.subParams.unsubscribe();
  }

  addToCart(product: IProduct): void {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
