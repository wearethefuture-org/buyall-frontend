import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldToObject'
})
export class FieldToObjectPipe implements PipeTransform {

  transform(value: any, field: string, list: any[]): Object {
    for (let i = 0;i < list.length;i++) {
      if (list[i][field] === value) {
        return list[i];
      }
    }
    
    return null;
  }
}
