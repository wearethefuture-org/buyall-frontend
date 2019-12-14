import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../interfaces/category';

@Pipe({
  name: 'idToName'
})
export class IdToNamePipe implements PipeTransform {

  transform(id: number, list: any[]): any {
    for (let i = 0;i < list.length;i++) {
      if (list[i].id === id) {
        return list[i].name;
      }
    }

    return null;
  }
}
