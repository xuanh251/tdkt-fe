import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DanhHieuThiDuaService } from 'src/app/_services/danh-hieu-thi-dua.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-danh-hieu-thi-dua-list',
  templateUrl: './danh-hieu-thi-dua-list.component.html',
  styleUrls: ['./danh-hieu-thi-dua-list.component.scss']
})
export class DanhHieuThiDuaListComponent implements OnInit, AfterViewInit {

  listDanhHieuThiDua: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor(
    private danhHieuThiDuaService: DanhHieuThiDuaService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.loadDanhHieuThiDuas();
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
      this.spinner.hide();
    }, 300);
  }
  loadDanhHieuThiDuas() {
    this.danhHieuThiDuaService.getListDanhHieuThiDua().subscribe(
      (listDanhHieuThiDua: any[]) => {
        this.listDanhHieuThiDua = listDanhHieuThiDua;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }

  deleteDanhHieuThiDua(uid: string, idx: number) {
    this.danhHieuThiDuaService.deleteDanhHieuThiDua(uid).subscribe(
      (message: any) => {
        this.alertify.success(message.data);
        this.listDanhHieuThiDua.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }


}
