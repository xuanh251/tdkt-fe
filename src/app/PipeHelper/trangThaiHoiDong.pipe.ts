import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trangThaiHoiDong'
})
export class TrangThaiHoiDongPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 0:
        return 'Chưa mở';
      case 1:
        return 'Đã đóng';
      case 2:
        return 'Đang mở';
      default:
      return 'Không xác định';
    }
  }
}
