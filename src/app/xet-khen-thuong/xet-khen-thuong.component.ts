import { Component, OnInit } from '@angular/core';
import { HoiDongService } from '../_services/hoi-dong.service';
import { AlertifyService } from '../_services/ultisService/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-xet-khen-thuong',
  templateUrl: './xet-khen-thuong.component.html',
  styleUrls: ['./xet-khen-thuong.component.scss']
})
export class XetKhenThuongComponent implements OnInit {
  hoidong: any;
  haveHoiDong: boolean;
  isAdmin = false;
  constructor(
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    this.isAdmin = this.jwtHelper.decodeToken(localStorage.getItem('token')).info.ma_quyen === '2';
    this.haveHoiDong = false;
    this.getHoiDong();
  }
  getHoiDong() {
    this.hoiDongService.getLastHoiDong().subscribe(
      hoidong => {
        if (hoidong.trang_thai === 0) {
          this.haveHoiDong = true;
          this.hoidong = hoidong;
        }
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
      }
    );
  }

}
