import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { XetThiDuaService } from 'src/app/_services/xet-thi-dua.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { NgModalXtdcnComponent } from '../ng-modal/ng-modal-xtdcn/ng-modal-xtdcn.component';

@Component({
  selector: 'app-xet-td-ca-nhan',
  templateUrl: './xet-td-ca-nhan.component.html',
  styleUrls: ['./xet-td-ca-nhan.component.scss']
})
export class XetTdCaNhanComponent implements OnInit {
  @Input() maHoiDong: string;
  listXetTDCN: [];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  loadingDataTable = false;
  constructor(
    private modalService: NgbModal,
    private xetThiDuaService: XetThiDuaService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getListXetTDCN();
  }
  closemd() {
    this.modalService.dismissAll();
  }
  getListXetTDCN() {
    this.xetThiDuaService.getAllCaNhan(this.maHoiDong).subscribe(
      data => {
        this.listXetTDCN = data;
        if (this.listXetTDCN.length !== 0) {
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
    const modalRef = this.modalService.open(NgModalXtdcnComponent, {windowClass: 'modal-holder', centered: true, size: 'lg'});
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.maHoiDong = this.maHoiDong;
    modalRef.componentInstance.UpdateSuccess.subscribe(($e) => {
      this.modalService.dismissAll();
      this.getListXetTDCN();
    });
  }
  deleteObj(id: number, idx: number) {
    this.xetThiDuaService.deleteObjTDCN(id).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listXetTDCN.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
