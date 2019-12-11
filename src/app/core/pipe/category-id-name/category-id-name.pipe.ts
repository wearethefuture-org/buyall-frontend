import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../interfaces/category';

@Pipe({
  name: 'categoryIdName'
})
export class CategoryIdNamePipe implements PipeTransform {

  transform(id: number, categories: ICategory[]): any {
    
    for (let i = 0;i < categories.length;i++) {
      if (categories[i].id === id) {
        return categories[i].name;
      }
    }

    return null;
  }
}
