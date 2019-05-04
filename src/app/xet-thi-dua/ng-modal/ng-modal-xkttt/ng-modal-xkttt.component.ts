import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { DonviService } from 'src/app/_services/donvi.service';
import { HinhThucKhenThuongService } from 'src/app/_services/hinh-thuc-khen-thuong.service';
import { XetKhenThuongService } from 'src/app/_services/xet-khen-thuong.service';

@Component({
  selector: 'app-ng-modal-xkttt',
  templateUrl: './ng-modal-xkttt.component.html',
  styleUrls: ['./ng-modal-xkttt.component.scss']
})
export class NgModalXktttComponent implements OnInit {
  @Input() id;
  @Input() maHoiDong;
  @Output() UpdateSuccess = new EventEmitter<string>();

  myForm: FormGroup;
  submitted = false;
  listDonVi: [];
  reqData: any;
  listHinhThuc: any[];
  donViSetings: {};
  hinhThucSettings: {};
  selectedItemsDonVi: any;
  selectedItemsHinhThuc: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private donViService: DonviService,
    private khenthuongService: HinhThucKhenThuongService,
    private xetKhenThuong: XetKhenThuongService
  ) { }
  closeEvent() {
    this.UpdateSuccess.emit('Cập nhật thành công!');
  }
  ngOnInit() {
    if (this.id !== 0) {
      this.getObjById();
    }
    this.myForm = this.formBuilder.group({
      don_vi: [''],
      hinh_thuc: [''],
      ti_le_dat: [0],
      noi_dung: ['']
    });
    this.donViSetings = {
      singleSelection: true,
      primaryKey: 'ma_don_vi',
      labelKey: 'ten_don_vi',
      enableSearchFilter: true
    };
    this.hinhThucSettings = {
      singleSelection: true,
      primaryKey: 'ma_hinh_thuc',
      labelKey: 'ten_hinh_thuc',
      enableSearchFilter: true
    };
    this.getListDonVi();
    this.getListHinhThuc();
  }
  getObjById() {
    this.xetKhenThuong.getXetKTTTById(this.id).subscribe(
      data => {
        this.selectedItemsDonVi = [data.don_vi];
        this.selectedItemsHinhThuc = [data.hinh_thuc];
        this.myForm.get('ti_le_dat').setValue(data.ti_le_dat);
        this.myForm.get('noi_dung').setValue(data.noi_dung);
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
  getListHinhThuc() {
    this.khenthuongService.getListHinhThucKhenThuong().subscribe(
      (data: any[]) => {
        this.listHinhThuc = data;
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
    this.reqData.ma_hinh_thuc = rawData.hinh_thuc[0].ma_hinh_thuc;
    this.reqData.ti_le_dat = rawData.ti_le_dat;
    this.reqData.noi_dung = rawData.noi_dung;
    this.xetKhenThuong.capNhatTapThe(this.reqData).subscribe(
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
