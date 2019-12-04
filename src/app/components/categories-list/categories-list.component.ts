import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICategory } from 'src/app/core/interfaces/category';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  subCategories: Subscription;
  categories: ICategory[];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.subCategories = this.categoriesService.getCategoriesList()
      .subscribe((categories: ICategory[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy() {
    this.subCategories.unsubscribe();
  }
}
