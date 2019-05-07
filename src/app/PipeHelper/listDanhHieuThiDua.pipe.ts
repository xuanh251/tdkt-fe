import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listDanhHieuThiDua'
})
export class ListDanhHieuThiDuaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let a = '';
    if (value !== undefined) {
      value.forEach(element => {
        a += element.ten_danh_hieu + ', ';
      });
      return a;
    }
    return '';
  }

}
