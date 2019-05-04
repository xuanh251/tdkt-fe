import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChucvuService } from 'src/app/_services/chucvu.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chucvu-edit',
  templateUrl: './chucvu-edit.component.html',
  styleUrls: ['./chucvu-edit.component.scss']
})
export class ChucvuEditComponent implements OnInit {

  myForm: FormGroup;
  id: string;
  objectAction = '';
  submitted = false;
  chucvuDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private chucvuService: ChucvuService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.getchucvuInfo(this.id);
    }
    this.myForm = this.formBuilder.group(
      {ten_chuc_vu: ['', Validators.required]}
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
      this.chucvuService.createChucVu(request).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/chuc-vu']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    } else {
      this.chucvuService.updateChucVu(request, this.id).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/chuc-vu']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
  }
  getchucvuInfo(uid: string) {
    this.chucvuService
      .getChucVu(uid)
      .subscribe((chucvu: any) => {
        this.chucvuDetail = chucvu;
        console.log(this.chucvuDetail);
      },
        error => {
          this.alertify.error(error);
        });
  }

}
