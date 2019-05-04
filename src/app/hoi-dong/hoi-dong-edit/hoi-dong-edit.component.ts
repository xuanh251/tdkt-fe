import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NamHocService } from 'src/app/_services/nam-hoc.service';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanCuService } from 'src/app/_services/can-cu.service';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-hoi-dong-edit',
  templateUrl: './hoi-dong-edit.component.html',
  styleUrls: ['./hoi-dong-edit.component.scss']
})
export class HoiDongEditComponent implements OnInit, AfterViewInit {
  frmTTC: FormGroup;
  objectAction: string;
  id: string;
  submittedTTC = false;
  message: string;
  namHoc: string;
  // inqdLink: string;
  @ViewChild('modalNamHoc') modalNamHoc: ElementRef;
  @ViewChild('modalCanCuRieng') modalCanCuRieng: ElementRef;
  @ViewChild(WizardComponent) wizard: WizardComponent;

  mdNamHoc: any;
  mdCanCuRieng: any;

  listNamHoc: any[];

  decodeToken: any;
  maHoiDong = '0';
  selectedItems = [];
  namHocSettings = {};

  listCanCuChung = [];
  listIdCCC = [];
  selectCanCuChung: any[];

  listCanCuRieng = [];
  selectCanCuRieng: any[];
  CanCuSetting = {};

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private namHocService: NamHocService,
    private hoiDongService: HoiDongService,
    private canCuService: CanCuService,
    private jwtHelper: JwtHelperService
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.frmTTC = this.formBuilder.group({
      ma_nam_hoc: ['', Validators.required],
      so_quyet_dinh: ['', Validators.required],
      ngay_ky: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.objectAction = this.id === '0' ? 'Thêm mới' : 'Cập nhật';
    this.getAllNamHoc();
    this.getCanCuChung();
    this.namHocSettings = {
      singleSelection: true,
      idField: 'ma_nam_hoc',
      textField: 'tu_ngay',
      allowSearchFilter: true
    };
    this.CanCuSetting = {
      singleSelection: false,
      primaryKey: 'ma_can_cu',
      labelKey: 'noi_dung',
      enableSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm'
    };
  }
  onItemSelect(item: any) {
    // console.log(item);
    // console.log(this.selectCanCuChung);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  finishFunction() {
    // console.log('done');
  }
  receiveMessageFromNamHoc($event) {
    this.mdNamHoc.modal('hide');
    this.getAllNamHoc();
  }
  receiveMessageFromCanCuRieng($event) {
    $event.noi_dung = $event.loai_can_cu + ' ' + $event.so_hieu_can_cu + ' của ' + $event.noi_ban_hanh;
    this.listCanCuRieng.push($event);
    this.mdCanCuRieng.modal('hide');
  }
  ngAfterViewInit() {
    this.mdNamHoc = $(this.modalNamHoc.nativeElement);
    this.mdCanCuRieng = $(this.modalCanCuRieng.nativeElement);
    // this.selectdp.nativeElement.selectpicker('refresh');
    // $('select').selectpicker();
  }
  getAllNamHoc() {
    this.namHocService.getListNamHoc().subscribe(
      (listnamhoc: any[]) => {
        this.listNamHoc = listnamhoc;
      },
      error => {
        this.alertify.error('Xảy ra lỗi khi nạp dữ liệu năm học!');
      }
    );
  }
  getCanCuChung() {
    this.canCuService.getListcancu().subscribe(data => {
      data.forEach(element => {
        element.noi_dung = element.loai_can_cu + ' ' + element.so_hieu_can_cu + ' của ' + element.noi_ban_hanh;
      });
      this.listCanCuChung = data;
    }, error => {
      this.alertify.error('Xảy ra lỗi khi nạp dữ liệu căn cứ!');
    });
  }
  get fTTC() {
    return this.frmTTC.controls;
  }
  submitTTC() {
    this.decodeToken = this.jwtHelper.decodeToken(
      localStorage.getItem('token')
    );
    this.submittedTTC = true;
    const CNgayKy = this.frmTTC.value.ngay_ky;
    this.frmTTC
      .get('ma_nam_hoc')
      .setValue(this.frmTTC.get('ma_nam_hoc').value[0].ma_nam_hoc);
    this.frmTTC.value.ngay_ky =
      CNgayKy.month + '-' + CNgayKy.day + '-' + CNgayKy.year;
    const request = this.frmTTC.value;
    request.nguoi_tao = this.decodeToken.info.ma_can_bo;
    // console.log(request);
    if (this.id === '0') {
      this.hoiDongService.createHoiDong(request).subscribe(
        next => {
          this.alertify.success('Khởi tạo hội đồng thành công');
          this.maHoiDong = next.ma_hoi_dong;
          this.namHoc = next.nam_hoc;
          this.wizard.navigation.goToNextStep();
          // this.namHoc=this.
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
  }
  capnhatCanCu() {
    this.listIdCCC = [];
    // console.log(this.selectCanCuChung);
    this.selectCanCuChung.forEach(element => {
      this.listIdCCC.push(element.ma_can_cu);
    });
    this.hoiDongService.updateCanCuChung(this.maHoiDong, this.listIdCCC, this.selectCanCuRieng).subscribe( next => {
      this.alertify.success(next);
      this.wizard.navigation.goToNextStep();
    },
    err => {
      this.alertify.error('Bạn chưa nhập đẩy đủ thông tin căn cứ!');
      console.log(err);
    });
  }
}
