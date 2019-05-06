import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DanhHieuThiDuaService } from 'src/app/_services/danh-hieu-thi-dua.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-danh-hieu-thi-dua-edit',
  templateUrl: './danh-hieu-thi-dua-edit.component.html',
  styleUrls: ['./danh-hieu-thi-dua-edit.component.scss']
})
export class DanhHieuThiDuaEditComponent implements OnInit {

  myForm: FormGroup;
  id: string;
  objectAction = '';
  submitted = false;
  DanhHieuThiDuaDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private danhHieuThiDuaService: DanhHieuThiDuaService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.getDanhHieuThiDuaInfo(this.id);
    }
    this.myForm = this.formBuilder.group(
      {
        ten_danh_hieu: ['', Validators.required],
        doi_tuong_ap_dung: ['', Validators.required],
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
      this.danhHieuThiDuaService.createDanhHieuThiDua(request).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/danh-hieu-thi-dua']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    } else {
      this.danhHieuThiDuaService.updateDanhHieuThiDua(request, this.id).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/danh-hieu-thi-dua']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
  }
  getDanhHieuThiDuaInfo(uid: string) {
    this.danhHieuThiDuaService
      .getDanhHieuThiDua(uid)
      .subscribe((DanhHieuThiDua: any) => {
        this.DanhHieuThiDuaDetail = DanhHieuThiDua;
        console.log(this.DanhHieuThiDuaDetail);
      },
        error => {
          this.alertify.error(error);
        });
  }

}
