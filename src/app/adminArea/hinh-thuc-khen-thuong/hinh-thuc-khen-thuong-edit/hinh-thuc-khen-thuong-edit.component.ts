import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HinhThucKhenThuongService } from 'src/app/_services/hinh-thuc-khen-thuong.service';

@Component({
  selector: 'app-hinh-thuc-khen-thuong-edit',
  templateUrl: './hinh-thuc-khen-thuong-edit.component.html',
  styleUrls: ['./hinh-thuc-khen-thuong-edit.component.scss']
})
export class HinhThucKhenThuongEditComponent implements OnInit {

  myForm: FormGroup;
  id: string;
  objectAction = '';
  submitted = false;
  HinhThucKhenThuongDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private hinhThucKhenThuongService: HinhThucKhenThuongService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.getHinhThucKhenThuongInfo(this.id);
    }
    this.myForm = this.formBuilder.group(
      {
        ten_hinh_thuc: ['', Validators.required],
        ti_le_dat: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
    this.objectAction = this.id === '0' ? 'Thêm mới' : 'Cập nhật';
  }
  get f() {
    return this.myForm.controls;
  }
  onSubmit(request: any) {
    this.submitted = true;
    console.log(request);

    // stop here if form is invalid
    if (this.myForm.invalid) {
      console.log('loi');
      return;
    }
    if (this.id === '0') {
      this.hinhThucKhenThuongService.createHinhThucKhenThuong(request).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/hinh-thuc-khen-thuong']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    } else {
      this.hinhThucKhenThuongService.updateHinhThucKhenThuong(request, this.id).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/hinh-thuc-khen-thuong']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
  }
  getHinhThucKhenThuongInfo(uid: string) {
    this.hinhThucKhenThuongService
      .getHinhThucKhenThuong(uid)
      .subscribe((HinhThucKhenThuong: any) => {
        this.HinhThucKhenThuongDetail = HinhThucKhenThuong;
        console.log(this.HinhThucKhenThuongDetail);
      },
        error => {
          this.alertify.error(error);
        });
  }

}
