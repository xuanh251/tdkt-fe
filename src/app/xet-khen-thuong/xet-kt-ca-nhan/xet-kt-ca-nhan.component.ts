import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { XetKhenThuongService } from 'src/app/_services/xet-khen-thuong.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { NgModalXktcnComponent } from 'src/app/xet-thi-dua/ng-modal/ng-modal-xktcn/ng-modal-xktcn.component';

@Component({
  selector: 'app-xet-kt-ca-nhan',
  templateUrl: './xet-kt-ca-nhan.component.html',
  styleUrls: ['./xet-kt-ca-nhan.component.scss']
})
export class XetKtCaNhanComponent implements OnInit {
  @Input() maHoiDong: string;
  listXetKTCN: [];
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
    this.getListXetKTCN();
  }
  closemd() {
    this.modalService.dismissAll();
  }
  getListXetKTCN() {
    this.xetKhenThuongService.getAllCaNhan(this.maHoiDong).subscribe(
      data => {
        this.listXetKTCN = data;
        if (this.listXetKTCN.length !== 0) {
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
    const modalRef = this.modalService.open(NgModalXktcnComponent, {windowClass: 'modal-holder', centered: true, size: 'lg'});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.maHoiDong = this.maHoiDong;
    modalRef.componentInstance.UpdateSuccess.subscribe(($e) => {
      this.modalService.dismissAll();
      this.getListXetKTCN();
    });
  }
  deleteObj(id: number, idx: number) {
    this.xetKhenThuongService.deleteObjKTCN(id).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listXetKTCN.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
