import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'bauchondanhhieu'
})
export class BauchondanhhieuPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any, args?: any): SafeHtml {
    if (value === 0) {
      return this.sanitizer.bypassSecurityTrustHtml('<span class="badge badge-brand">Chưa bầu chọn</span>');
    }
    if (value === 1) {
      return this.sanitizer.bypassSecurityTrustHtml('<span class="badge badge-primary">Đang bầu chọn</span>');
    }
    if (value === 2) {
      return this.sanitizer.bypassSecurityTrustHtml('<span class="badge badge-success">Đã kết thúc</span>');
    }
    return null;
  }

}
