import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhHieuThiDuaService } from 'src/app/_services/danh-hieu-thi-dua.service';
import { CanboService } from 'src/app/_services/canbo.service';
import { XetThiDuaService } from 'src/app/_services/xet-thi-dua.service';

@Component({
  selector: 'app-ng-modal-xtdcn',
  templateUrl: './ng-modal-xtdcn.component.html',
  styleUrls: ['./ng-modal-xtdcn.component.scss']
})
export class NgModalXtdcnComponent implements OnInit {
  @Input() id;
  @Input() maHoiDong;
  @Output() UpdateSuccess = new EventEmitter<string>();

  myForm: FormGroup;
  submitted = false;
  listCanBo: [];
  reqData: any;
  listDanhHieu: any[];
  canBoSetings: {};
  danhHieuSettings: {};
  selectedItemsCanBo: any;
  selectedItemsDanhHieu: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private canBoService: CanboService,
    private danhHieuService: DanhHieuThiDuaService,
    private xetThiDua: XetThiDuaService
  ) {}
  closeEvent() {
    this.UpdateSuccess.emit('Cập nhật thành công!');
  }
  ngOnInit() {
    if (this.id !== 0) {
      this.getObjById();
    }
    this.myForm = this.formBuilder.group({
      can_bo: [''],
      danh_hieu: [''],
      ti_le_dat: [0]
    });
    this.canBoSetings = {
      singleSelection: true,
      primaryKey: 'ma_can_bo',
      labelKey: 'ho_ten',
      enableSearchFilter: true
    };
    this.danhHieuSettings = {
      singleSelection: true,
      primaryKey: 'ma_danh_hieu',
      labelKey: 'ten_danh_hieu',
      enableSearchFilter: true
    };
    this.getListCanBo();
    this.getListDanhHieu();
  }
  getObjById() {
    this.xetThiDua.getXetTDCNById(this.id).subscribe(
      data => {
        this.selectedItemsCanBo = [data.can_bo];
        this.selectedItemsDanhHieu = [data.danh_hieu];
        this.myForm.get('ti_le_dat').setValue(data.ti_le_dat);
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp dữ liệu!');
      }
    );
  }
  getListCanBo() {
    this.canBoService.getListCanBo().subscribe(
      (data: any) => {
        this.listCanBo = data;
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp danh sách cán bộ!');
      }
    );
  }
  filterCaNhan(element) {
    return element.doi_tuong_ap_dung === 'Cá nhân';
  }
  getListDanhHieu() {
    this.danhHieuService.getListDanhHieuThiDua().subscribe(
      (data: any[]) => {
        const a = data.filter(this.filterCaNhan);
        this.listDanhHieu = a;
      },
      error => {
        this.alertify.error(
          'Đã xảy ra lỗi khi nạp danh sách danh hiệu thi đua!'
        );
      }
    );
  }
  capNhat() {
    const rawData = this.myForm.value;
    this.reqData = {};
    this.reqData.id = this.id;
    this.reqData.ma_hoi_dong = this.maHoiDong;
    this.reqData.ma_can_bo = rawData.can_bo[0].ma_can_bo;
    this.reqData.ma_danh_hieu = rawData.danh_hieu[0].ma_danh_hieu;
    this.reqData.ti_le_dat = rawData.ti_le_dat;
    this.xetThiDua.capNhatCaNhan(this.reqData).subscribe(
      next => {
        this.alertify.success(next);
        this.closeEvent();
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi');
        console.log(err);
      }
    );
  }
}
