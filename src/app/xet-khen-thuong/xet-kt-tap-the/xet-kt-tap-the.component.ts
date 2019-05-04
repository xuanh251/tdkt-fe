import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { XetKhenThuongService } from 'src/app/_services/xet-khen-thuong.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgModalXktttComponent } from 'src/app/xet-thi-dua/ng-modal/ng-modal-xkttt/ng-modal-xkttt.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-xet-kt-tap-the',
  templateUrl: './xet-kt-tap-the.component.html',
  styleUrls: ['./xet-kt-tap-the.component.scss']
})
export class XetKtTapTheComponent implements OnInit {
  @Input() maHoiDong: string;
  listXetKTTT: [];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  loadingDataTable = false;
  constructor(
    private modalService: NgbModal,
    private xetKhenThuongService: XetKhenThuongService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getListXetKTTT();
  }
  closemd() {
    this.modalService.dismissAll();
  }
  getListXetKTTT() {
    this.xetKhenThuongService.getAllTapThe(this.maHoiDong).subscribe(
      data => {
        this.listXetKTTT = data;
        if (this.listXetKTTT.length !== 0) {
          if (!this.loadingDataTable) {
            setTimeout(() => {
              this.dataTable = $(this.table.nativeElement);
              this.dataTable.DataTable({
                language: environment.dataTableLanguage
              });
              this.loadingDataTable = true;
            }, 1000);
          }
        }
        this.spinner.hide();
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp danh sách hội đồng!');
      }
    );
  }
  open(id) {
    const modalRef = this.modalService.open(NgModalXktttComponent, {windowClass: 'modal-holder', centered: true, size: 'lg'});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.maHoiDong = this.maHoiDong;
    modalRef.componentInstance.UpdateSuccess.subscribe(($e) => {
      this.modalService.dismissAll();
      this.getListXetKTTT();
    });
  }
  deleteObj(id: number, idx: number) {
    this.xetKhenThuongService.deleteObjKTTT(id).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listXetKTTT.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
