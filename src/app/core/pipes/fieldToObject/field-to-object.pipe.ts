import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldToObject'
})
export class FieldToObjectPipe implements PipeTransform {

  transform(value: any, field: string, list: any[]): object {
    for (const item of list) {
      if (item[field] === value) {
        return item;
      }
    }

    return null;
  }
}
