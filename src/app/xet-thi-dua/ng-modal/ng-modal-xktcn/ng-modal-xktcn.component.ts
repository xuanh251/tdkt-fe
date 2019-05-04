import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { CanboService } from 'src/app/_services/canbo.service';
import { HinhThucKhenThuongService } from 'src/app/_services/hinh-thuc-khen-thuong.service';
import { XetKhenThuongService } from 'src/app/_services/xet-khen-thuong.service';

@Component({
  selector: 'app-ng-modal-xktcn',
  templateUrl: './ng-modal-xktcn.component.html',
  styleUrls: ['./ng-modal-xktcn.component.scss']
})
export class NgModalXktcnComponent implements OnInit {
  @Input() id;
  @Input() maHoiDong;
  @Output() UpdateSuccess = new EventEmitter<string>();

  myForm: FormGroup;
  submitted = false;
  listCanBo: [];
  reqData: any;
  listHinhThuc: any[];
  canBoSetings: {};
  hinhThucSettings: {};
  selectedItemsCanBo: any;
  selectedItemsHinhThuc: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private canBoService: CanboService,
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
      can_bo: [''],
      hinh_thuc: [''],
      ti_le_dat: [0],
      noi_dung: ['']
    });
    this.canBoSetings = {
      singleSelection: true,
      primaryKey: 'ma_can_bo',
      labelKey: 'ho_ten',
      enableSearchFilter: true
    };
    this.hinhThucSettings = {
      singleSelection: true,
      primaryKey: 'ma_hinh_thuc',
      labelKey: 'ten_hinh_thuc',
      enableSearchFilter: true
    };
    this.getListCanBo();
    this.getListHinhThuc();
  }
  getObjById() {
    this.xetKhenThuong.getXetKTCNById(this.id).subscribe(
      data => {
        console.log(data);
        this.selectedItemsCanBo = [data.can_bo];
        this.selectedItemsHinhThuc = [data.hinh_thuc];
        this.myForm.get('ti_le_dat').setValue(data.ti_le_dat);
        this.myForm.get('noi_dung').setValue(data.noi_dung);
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp dữ liệu!');
      }
    );
  }
  getListCanBo() {
    this.canBoService.getListCanBo().subscribe(
      (data: []) => {
        this.listCanBo = data;
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
    this.reqData.ma_can_bo = rawData.can_bo[0].ma_can_bo;
    this.reqData.ma_hinh_thuc = rawData.hinh_thuc[0].ma_hinh_thuc;
    this.reqData.ti_le_dat = rawData.ti_le_dat;
    this.reqData.noi_dung = rawData.noi_dung;
    this.xetKhenThuong.capNhatCaNhan(this.reqData).subscribe(
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
