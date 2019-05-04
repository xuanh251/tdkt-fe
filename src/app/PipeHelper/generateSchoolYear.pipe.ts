import { Pipe, PipeTransform } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Pipe({
  name: 'generateSchoolYear'
})
export class GenerateSchoolYearPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (args === 'dpk') {
      const count = Object.keys(value).length;
      if (count === 3) {
        return 'Năm học ' + value.year + ' - ' + (value.year + 1);
      }
      return 'Định dạng ngày chưa đúng!';
    } else {
      const year = value.substr(0, 4);
      return year + ' - ' + (+year + 1);
    }
  }
}
