import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DonviService } from 'src/app/_services/donvi.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donvi-edit',
  templateUrl: './donvi-edit.component.html',
  styleUrls: ['./donvi-edit.component.scss']
})
export class DonviEditComponent implements OnInit {
  myForm: FormGroup;
  id: string;
  objectAction = '';
  submitted = false;
  donviDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private donviService: DonviService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.getdonviInfo(this.id);
    }
    this.myForm = this.formBuilder.group(
      {
        ten_don_vi: ['', Validators.required],
        loai_don_vi: ['', Validators.required]
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
      this.donviService.createDonVi(request).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/don-vi']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    } else {
      this.donviService.updateDonVi(request, this.id).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/don-vi']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
  }
  getdonviInfo(uid: string) {
    this.donviService
      .getDonVi(uid)
      .subscribe((donvi: any) => {
        this.donviDetail = donvi;
        console.log(this.donviDetail);
      },
        error => {
          this.alertify.error(error);
        });
  }

}
