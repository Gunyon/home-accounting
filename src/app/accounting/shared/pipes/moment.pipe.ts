import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'haMoment'
})
export class MomentPipe implements PipeTransform {
  transform(value: string, formatIn: string, formauOut: string = 'DD/MM/YYYY'): string {
    return moment(value, formatIn).format(formauOut);
  }
}
