import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'haFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filterValue: string, searchBy: string): any {
    if (items.length === 0 || ! filterValue) {
      return items;
    }

    return items.filter((item) => {
      return (item[searchBy] + '').toLowerCase().includes(filterValue.toLowerCase());
    });
  }
}
