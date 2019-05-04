import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/ultisService/alertify.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocketService } from '../_services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private jwtHelper: JwtHelperService,
    private socket: SocketService
  ) {}
  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['']);
    } else {
      this.titleService.setTitle('Đăng nhập hệ thống');
    }
  }
  login() {
    this.spinner.show();
    this.authService.login(this.model).subscribe(
      (next: any) => {
        if (next.message === 'isUsing') {
          this.alertify.error('Tài khoản này hiện đang được sử dụng bởi người khác');
          this.spinner.hide();
        } else {
          this.alertify.success('Đăng nhập thành công!');
          this.router.navigate(['/home']);
          this.spinner.hide();
        }
      },
      err => {
        this.alertify.error(err);
        this.spinner.hide();
      },
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
