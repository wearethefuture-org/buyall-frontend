import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idToName'
})
export class IdToNamePipe implements PipeTransform {

  transform(id: number, list: any[]): any {
    for (const item of list) {
      if (item.id === id) {
        return item.name;
      }
    }

    return null;
  }
}
