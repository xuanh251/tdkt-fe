import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChucDanhService } from 'src/app/_services/chuc-danh.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chuc-danh-edit',
  templateUrl: './chuc-danh-edit.component.html',
  styleUrls: ['./chuc-danh-edit.component.scss']
})
export class ChucDanhEditComponent implements OnInit {
  myForm: FormGroup;
  id: string;
  objectAction = '';
  submitted = false;
  // chucdanhDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private chucdanhService: ChucDanhService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.getchucdanhInfo(this.id);
    }
    this.myForm = this.formBuilder.group({
      ten_chuc_danh: ['', Validators.required],
      tham_gia_bo_phieu: [false, Validators.required]
    });
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
      this.chucdanhService.createChucdanh(request).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/chuc-danh']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    } else {
      this.chucdanhService.updateChucdanh(request, this.id).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/chuc-danh']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
  }
  getchucdanhInfo(uid: string) {
    this.chucdanhService.getChucdanh(uid).subscribe(
      (chucdanh: any) => {
        delete chucdanh.ma_chuc_danh;
        this.myForm.setValue(chucdanh);
        console.log(this.myForm.value);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
