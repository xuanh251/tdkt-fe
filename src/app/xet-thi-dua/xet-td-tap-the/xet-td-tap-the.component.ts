import {
  Component,
  OnInit,
  ViewChild,
  Input,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModalXtdttComponent } from '../ng-modal/ng-modal-xtdtt/ng-modal-xtdtt.component';
import { XetThiDuaService } from 'src/app/_services/xet-thi-dua.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-xet-td-tap-the',
  templateUrl: './xet-td-tap-the.component.html',
  styleUrls: ['./xet-td-tap-the.component.scss']
})
export class XetTdTapTheComponent implements OnInit, AfterViewInit {
  @Input() maHoiDong: string;
  listXetTDTT: [];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  loadingDataTable = false;
  constructor(
    private modalService: NgbModal,
    private xetThiDuaService: XetThiDuaService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.spinner.show();
    this.getListXetTDTT();
  }
  ngAfterViewInit() {
  }
  closemd() {
    this.modalService.dismissAll();
  }
  getListXetTDTT() {
    this.xetThiDuaService.getAllTapThe(this.maHoiDong).subscribe(
      data => {
        this.listXetTDTT = data;
        if (this.listXetTDTT.length !== 0) {
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
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi nạp danh sách hội đồng!');
      }
    );
  }
  open(id) {
    const modalRef = this.modalService.open(NgModalXtdttComponent, {
      windowClass: 'modal-holder',
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.maHoiDong = this.maHoiDong;
    modalRef.componentInstance.UpdateSuccess.subscribe($e => {
      this.modalService.dismissAll();
      this.getListXetTDTT();
    });
  }
  deleteObj(id: number, idx: number) {
    this.xetThiDuaService.deleteObjTDTT(id).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listXetTDTT.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }
}
