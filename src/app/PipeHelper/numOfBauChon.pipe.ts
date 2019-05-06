import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numOfBauChon'
})
export class NumOfBauChonPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (value === undefined) {
      return 0;
    }
    return value.filter(rs => rs.trang_thai_bau_chon).length;
  }

}
