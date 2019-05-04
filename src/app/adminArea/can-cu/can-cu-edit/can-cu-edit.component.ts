import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CanCuService } from 'src/app/_services/can-cu.service';

@Component({
  selector: 'app-can-cu-edit',
  templateUrl: './can-cu-edit.component.html',
  styleUrls: ['./can-cu-edit.component.scss']
})
export class CanCuEditComponent implements OnInit {

  myForm: FormGroup;
  id: string;
  objectAction = '';
  submitted = false;
  isCCR = false;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    private formBuilder: FormBuilder,
    private cancuService: CanCuService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.id !== '0') {
      this.getcancuInfo(this.id);
    }
    const url = this.router.url;
    this.isCCR = url.includes('hoi-dong');
    this.myForm = this.formBuilder.group({
      ma_can_cu: [''],
      loai_can_cu: ['', Validators.required],
      so_hieu_can_cu: ['', Validators.required],
      ngay_ky: ['', Validators.required],
      noi_ban_hanh: ['', Validators.required],
      trich_yeu: ['', Validators.required]
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
    const CNgayKy = this.myForm.value.ngay_ky;
    this.myForm.value.ngay_ky = CNgayKy.month + '-' + CNgayKy.day + '-' + CNgayKy.year;
    // stop here if form is invalid
    if (this.myForm.invalid) {
      console.log('loi');
      return;
    }
    if (this.id === '0') {
      const request = this.myForm.value;
      request.trang_thai = this.isCCR ? 1 : 0;
      if (this.isCCR) {
        this.sendMessage(request);
      } else {
        this.cancuService.createcancu(request).subscribe(
          success => {
            this.alertify.success(success);
            this.router.navigate(['/quan-tri/can-cu']);
          },
          err => {
            this.alertify.error('Đã xảy ra lỗi!');
            console.log(err);
          }
        );
      }
    } else {
      this.cancuService.updatecancu(this.myForm.value, this.id).subscribe(
        success => {
          this.alertify.success(success);
          this.router.navigate(['/quan-tri/can-cu']);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
          console.log(err);
        }
      );
    }
    this.myForm.reset();
  }
  sendMessage(obj: any) {
    this.messageEvent.emit(obj);
  }
  getcancuInfo(uid: string) {
    this.cancuService
      .getcancu(uid)
      .subscribe((cancu: any) => {
        delete cancu.trang_thai;
        const ngayKy = cancu.ngay_ky.split('-');
        cancu.ngay_ky = {'year': + ngayKy[0], 'month': + ngayKy[1], 'day': + ngayKy[2]};
        this.myForm.setValue(cancu);
      },
        error => {
          this.alertify.error(error);
        });
  }

}
