import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_services/ultisService/utility.service';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  registerForm: FormGroup;
  id: string;
  accountAction = '';
  submitted = false;
  accountDetail: any;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertify: AlertifyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('uid');
    this.registerForm = this.formBuilder.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        user_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confirm_password')
      }
    );
    if (this.id !== '0') {
      this.getAccountInfo(this.id);
    }
    this.checkAction();
  }

  ngOnInit() {
    this.accountAction = this.id === '0' ? 'Thêm mới' : 'Cập nhật';
  }
  get f() {
    return this.registerForm.controls;
  }
  checkAction() {
    if (this.id !== '0') {
      const password = this.registerForm.get('password');
      // tslint:disable-next-line:variable-name
      const confirm_password = this.registerForm.get('confirm_password');
      // tslint:disable-next-line:variable-name
      const user_name = this.registerForm.get('user_name');
      const email = this.registerForm.get('email');
      password.setValidators(null);
      confirm_password.setValidators(null);
      user_name.disable();
      email.disable();
    }
  }
  onSubmit(request: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('loi');
      return;
    }
    if (this.id === '0') {
      // this.accountService.createAccount(request).subscribe(
      //   success => {
      //     this.alertify.success(success);
      //     this.router.navigate(['/quan-tri/nguoi-dung']);
      //   },
      //   err => {
      //     this.alertify.error('Đã xảy ra lỗi!');
      //     console.log(err);
      //   }
      // );
    } else {
      // this.accountService.updateAccount(request, this.id).subscribe(
      //   success => {
      //     this.alertify.success(success);
      //     this.router.navigate(['/quan-tri/nguoi-dung']);
      //   },
      //   err => {
      //     this.alertify.error('Đã xảy ra lỗi!');
      //     console.log(err);
      //   }
      // );
    }
  }



  getAccountInfo(uid: string) {
    // this.accountService
    //   .getAccount(uid)
    //   .subscribe((account: any) => {
    //     this.accountDetail = account;
    //     console.log(this.registerForm.value);
    //   },
    //     error => {
    //     this.alertify.error(error);
    //   });
  }
}
