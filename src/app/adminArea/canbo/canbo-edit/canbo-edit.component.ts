import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CanboService } from 'src/app/_services/canbo.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DonviService } from 'src/app/_services/donvi.service';
import { ChucvuService } from 'src/app/_services/chucvu.service';
import { NgbDatepickerConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-canbo-edit',
  templateUrl: './canbo-edit.component.html',
  styleUrls: ['./canbo-edit.component.scss'],
  providers: [NgbDatepickerConfig]
})
export class CanboEditComponent implements OnInit {
  myForm: FormGroup;
  id: string;
  objectAction = '';
  submitted = false;
  canBoDetail: any;
  // messageDemo: string;
  listDonVi: any[];
  listChucVu: any[];
  listQuyen: any[];
  constructor(
    private formBuilder: FormBuilder,
    private canBoService: CanboService,
    private donviService: DonviService,
    private chucVuService: ChucvuService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private config: NgbDatepickerConfig
  ) {
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2099, month: 12, day: 31 };

    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.getListDonVi();
    this.getListChucVu();
    this.getQuyen();
    if (this.id !== '0') {
      this.getCanBoInfo(this.id);
    }
    this.myForm = this.formBuilder.group({
      ho_ten: ['', Validators.required],
      ngay_sinh: ['', Validators.required],
      gioi_tinh: ['', Validators.required],
      que_quan: [''],
      ma_don_vi: ['', Validators.required],
      ma_chuc_vu: ['', Validators.required],
      email: ['', Validators.required],
      ma_quyen: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.objectAction = this.id === '0' ? 'Thêm mới' : 'Cập nhật';
  }
  get f() {
    return this.myForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.myForm.value);
    const CNgaySinh = this.myForm.value.ngay_sinh;
    this.myForm.value.ngay_sinh =
      CNgaySinh.month + '-' + CNgaySinh.day + '-' + CNgaySinh.year;
    console.log(this.myForm.value);
    // stop here if form is invalid
    if (this.myForm.invalid) {
      console.log('loi');
      return;
    }
    if (this.id === '0') {
      this.canBoService.createCanBo(this.myForm.value).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/can-bo']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    } else {
      this.canBoService.updateCanBo(this.myForm.value, this.id).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/can-bo']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
  }

  getListDonVi() {
    this.donviService.getListDonVi().subscribe(
      (rs: any[]) => {
        this.listDonVi = rs;
      },
      error => {
        console.log('get list don vi: ' + error);
      }
    );
  }
  getListChucVu() {
    this.chucVuService.getListChucVu().subscribe(
      (rs: any[]) => {
        this.listChucVu = rs;
      },
      error => {
        console.log('get list chuc vu: ' + error);
      }
    );
  }
  getQuyen() {
    this.canBoService.getListQuyenLimit().subscribe(
      (listQuyen: any[]) => {
        this.listQuyen = listQuyen;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  getCanBoInfo(uid: string) {
    this.canBoService.getCanBo(uid).subscribe(
      (canBo: any) => {
        console.log(canBo);
        delete canBo.DonVi;
        delete canBo.ChucVu;
        delete canBo.Quyen;
        delete canBo.ma_can_bo;
        delete canBo.password;
        delete canBo.anh_dai_dien;
        this.myForm.setValue(canBo);
        const ngaySinh = this.myForm.get('ngay_sinh').value.split('-');
        this.myForm.get('ngay_sinh').setValue({
          year: +ngaySinh[0],
          month: +ngaySinh[1],
          day: +ngaySinh[2]
        });
        this.myForm.get('ma_don_vi').setValue(canBo.ma_don_vi);
        this.myForm.get('ma_chuc_vu').setValue(canBo.ma_chuc_vu);
        this.myForm.get('ma_quyen').setValue(canBo.ma_quyen);
        console.log(this.myForm.value);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
