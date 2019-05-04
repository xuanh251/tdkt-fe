import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChucDanhService } from 'src/app/_services/chuc-danh.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chuc-danh',
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss']
})
export class ChucDanhComponent implements OnInit, AfterViewInit {

  listchucdanh: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor(
    private chucdanhService: ChucDanhService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.loadchucdanhs();
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
      this.spinner.hide();
    }, 300);
  }
  loadchucdanhs() {
    this.chucdanhService.getListChucdanh().subscribe(
      (listchucdanh: any[]) => {
        this.listchucdanh = listchucdanh;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }

  deletechucdanh(uid: string, idx: number) {
    this.chucdanhService.deleteChucdanh(uid).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listchucdanh.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
