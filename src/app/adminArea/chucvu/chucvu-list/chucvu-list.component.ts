import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChucvuService } from 'src/app/_services/chucvu.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-chucvu-list',
  templateUrl: './chucvu-list.component.html',
  styleUrls: ['./chucvu-list.component.scss']
})
export class ChucvuListComponent implements OnInit, AfterViewInit {

  listchucvu: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor(
    private chucvuService: ChucvuService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.loadchucvus();
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
      this.spinner.hide();
    }, 300);
  }
  loadchucvus() {
    this.chucvuService.getListChucVu().subscribe(
      (listchucvu: any[]) => {
        this.listchucvu = listchucvu;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }

  deletechucvu(uid: string, idx: number) {
    this.chucvuService.deleteChucVu(uid).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listchucvu.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
