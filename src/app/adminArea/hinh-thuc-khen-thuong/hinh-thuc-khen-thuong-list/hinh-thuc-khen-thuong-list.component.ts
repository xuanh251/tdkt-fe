import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HinhThucKhenThuongService } from 'src/app/_services/hinh-thuc-khen-thuong.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hinh-thuc-khen-thuong-list',
  templateUrl: './hinh-thuc-khen-thuong-list.component.html',
  styleUrls: ['./hinh-thuc-khen-thuong-list.component.scss']
})
export class HinhThucKhenThuongListComponent implements OnInit, AfterViewInit {

  listHinhThucKhenThuong: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor(
    private hinhThucKhenThuongService: HinhThucKhenThuongService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.loadHinhThucKhenThuongs();
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
    }, 300);
  }
  loadHinhThucKhenThuongs() {
    this.hinhThucKhenThuongService.getListHinhThucKhenThuong().subscribe(
      (listHinhThucKhenThuong: any[]) => {
        this.listHinhThucKhenThuong = listHinhThucKhenThuong;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }

  deleteHinhThucKhenThuong(uid: string, idx: number) {
    this.hinhThucKhenThuongService.deleteHinhThucKhenThuong(uid).subscribe(
      (message: any) => {
        this.alertify.success(message.data);
        this.listHinhThucKhenThuong.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
