import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'pipeBooleanToHTML'
})
export class PipeBooleanToHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any, args?: any, args2?: any): SafeHtml {
    switch (args) {
      case 'cb-ns-male':
        return args2 === false ? value : '';
        case 'cb-ns-female':
        return args2 === true ? value : '';
      default:
        if (value === true) {
          return this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-check-circle"></i> Có');
        } else {
          return this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-times"></i> Không');
        }
    }
  }
}
