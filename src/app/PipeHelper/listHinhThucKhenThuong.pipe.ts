import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listHinhThucKhenThuong'
})
export class ListHinhThucKhenThuongPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let a = '';
    if (value !== undefined) {
      value.forEach(element => {
        a += element.ten_hinh_thuc + ', ';
      });
      return a;
    }
    return '';
  }

}
