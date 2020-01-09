import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products: IProduct[];

  constructor() { }

  ngOnInit(): void {
  }
}
