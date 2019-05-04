import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanboService } from 'src/app/_services/canbo.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { ChucDanhService } from 'src/app/_services/chuc-danh.service';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';

@Component({
  selector: 'app-thanh-phan',
  templateUrl: './thanh-phan.component.html',
  styleUrls: ['./thanh-phan.component.scss']
})
export class ThanhPhanComponent implements OnInit, AfterViewInit {
  myForm: FormGroup;

  listThanhVien: any[];

  listCanBo = [];
  IdCanBo = 0;
  canBoSettings = {};

  listChucDanh = [];
  IdChucDanh = 0;
  chucDanhSettings = {};
  submitted = false;
  @Input() idHoiDong: string;
  @Input() NamHoc: string;
  @ViewChild('modalUpdateThanhPhan') modalTPHD: ElementRef;
  mdTPHD: any;
  constructor(
    private formBuilder: FormBuilder,
    private canBoService: CanboService,
    private alertify: AlertifyService,
    private chucDanhService: ChucDanhService,
    private hoiDongService: HoiDongService
    ) {
    this.myForm = this.formBuilder.group({
      can_bo: ['', Validators.required],
      chuc_danh: ['', Validators.required]
    });
  }
  getListCanBo() {
    this.canBoService.getListCanBo().subscribe(
      listcanbo => {
        const list = listcanbo.filter(rs => rs.ma_quyen !== '2');
        list.forEach(elem => {
          elem.noi_dung = elem.ho_ten + ' - ' + elem.ChucVu.ten_chuc_vu + ' ' + elem.DonVi.ten_don_vi;
        });
        this.listCanBo = list;
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }
  getListChucDanh() {
    this.chucDanhService.getListChucdanh().subscribe(
      listchucdanh => {
        this.listChucDanh = listchucdanh;
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }
  ngOnInit() {
    this.getListThanhVienHoiDong();
    this.getListCanBo();
    this.getListChucDanh();
    this.canBoSettings = {
      singleSelection: true,
      primaryKey: 'ma_can_bo',
      labelKey: 'noi_dung',
      enableSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm'
    };
    this.chucDanhSettings = {
      singleSelection: true,
      primaryKey: 'ma_chuc_danh',
      labelKey: 'ten_chuc_danh',
      enableSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm'
    };
  }
  CapNhatTPHD() {
    this.IdCanBo = 0;
    this.IdChucDanh = 0;
    this.IdCanBo = this.myForm.get('can_bo').value[0].ma_can_bo;
    this.IdChucDanh = this.myForm.get('chuc_danh').value[0].ma_chuc_danh;
    this.hoiDongService.updateThanhVienHoiDong(this.idHoiDong, this.IdCanBo, this.IdChucDanh).subscribe(
      data => {
        this.alertify.success(data);
        this.getListThanhVienHoiDong();
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
    this.mdTPHD.modal('hide');
  }
  ngAfterViewInit() {
    this.mdTPHD = $(this.modalTPHD.nativeElement);
  }
  getListThanhVienHoiDong() {
    this.hoiDongService.getListThanhVienHoiDong(this.idHoiDong).subscribe(
      data => {
        this.listThanhVien = data;
      },
      error => {
        this.alertify.error('Xảy ra lỗi khi nạp dữ liệu năm học!');
      }
    );
  }
}
