import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { DonviService } from 'src/app/_services/donvi.service';
import { DanhHieuThiDuaService } from 'src/app/_services/danh-hieu-thi-dua.service';
import { XetThiDuaService } from 'src/app/_services/xet-thi-dua.service';

@Component({
  selector: 'app-ng-modal-xtdtt',
  templateUrl: './ng-modal-xtdtt.component.html',
  styleUrls: ['./ng-modal-xtdtt.component.scss']
})
export class NgModalXtdttComponent implements OnInit {
  @Input() id;
  @Input() maHoiDong;
  @Output() UpdateSuccess = new EventEmitter<string>();

  myForm: FormGroup;
  submitted = false;
  listDonVi: [];
  reqData: any;
  listDanhHieu: any[];
  donViSetings: {};
  danhHieuSettings: {};
  selectedItemsDonVi: any;
  selectedItemsDanhHieu: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private donViService: DonviService,
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
      don_vi: [''],
      danh_hieu: [''],
      ti_le_dat: [0]
    });
    this.donViSetings = {
      singleSelection: true,
      primaryKey: 'ma_don_vi',
      labelKey: 'ten_don_vi',
      enableSearchFilter: true
    };
    this.danhHieuSettings = {
      singleSelection: true,
      primaryKey: 'ma_danh_hieu',
      labelKey: 'ten_danh_hieu',
      enableSearchFilter: true
    };
    this.getListDonVi();
    this.getListDanhHieu();
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  getObjById() {
    this.xetThiDua.getXetTDTTById(this.id).subscribe(
      data => {
        this.selectedItemsDonVi = [data.don_vi];
        this.selectedItemsDanhHieu = [data.danh_hieu];
        this.myForm.get('ti_le_dat').setValue(data.ti_le_dat);
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp dữ liệu!');
      }
    );
  }
  getListDonVi() {
    this.donViService.getListDonVi().subscribe(
      (data: any) => {
        const list = data.filter(rs => (rs.ma_don_vi !== 9));
        this.listDonVi = list;
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp danh sách đơn vị!');
      }
    );
  }
  filterTapThe(element) {
    return element.doi_tuong_ap_dung === 'Tập thể';
  }
  getListDanhHieu() {
    this.danhHieuService.getListDanhHieuThiDua().subscribe(
      (data: any[]) => {
        const a = data.filter(this.filterTapThe);
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
    this.reqData.ma_don_vi = rawData.don_vi[0].ma_don_vi;
    this.reqData.ma_danh_hieu = rawData.danh_hieu[0].ma_danh_hieu;
    this.reqData.ti_le_dat = rawData.ti_le_dat;
    this.xetThiDua.capNhatTapThe(this.reqData).subscribe(
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
