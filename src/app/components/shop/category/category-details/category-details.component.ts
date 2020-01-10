import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/core/interfaces/category';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  subParams: Subscription;
  subCategories: Subscription;
  category: ICategory;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subParams = this.route.params.subscribe((params: Params) => {
      const id = +params.id;

      this.subCategories = this.categoriesService.getCategoryById(id)
        .subscribe((category: ICategory) => {
          if (!category) {
            this.router.navigate(['/shop/category']);
          }

          this.category = category;
        });
    });
  }

  ngOnDestroy(): void {
    this.subParams.unsubscribe();
    this.subCategories.unsubscribe();
  }
}
