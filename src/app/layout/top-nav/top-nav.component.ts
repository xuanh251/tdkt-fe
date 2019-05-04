import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertifyService } from '../../_services/ultisService/alertify.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/_services/auth.service';
import { SocketService } from 'src/app/_services/socket.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  appName = environment.AppName;
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  HoTen: any;
  email: any;
  photoUrl: any;
  listThongBao: any[];
  thongBaoMoi = false;
  constructor(
    private alertify: AlertifyService,
    private router: Router,
    private authService: AuthService,
    private socket: SocketService) {}
  ngOnInit() {
    this.decodeToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.HoTen = this.decodeToken.info.ho_ten;
    this.email = this.decodeToken.info.email;
    this.photoUrl = 'http://' + environment.ApiOriginUrl + '/resources/' + this.decodeToken.info.anh_dai_dien.String;
    this.listThongBao = [];
    const token = localStorage.getItem('token');
    if (this.decodeToken.info.ma_quyen === '3') {
      this.socket.getEventListener().subscribe(event => {
        if (event.type === 'message') {
          const data = event.data.content;
          const findStr = data + '';
          const mo = findStr.indexOf('đã mở!');
          if (mo !== -1) {
            const chitiet = {
              noi_dung: data,
              da_xem: false
            };
            this.listThongBao.push(chitiet);
            this.checkThongBao();
          }
        }
      });
    }
  }
  checkThongBao() {
    const a = this.listThongBao.filter(rs => !rs.da_xem); // chưa xem
    this.thongBaoMoi = a.length !== 0;
  }
  logout() {
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.authService.setDeactive(decodedToken.info.ma_can_bo).subscribe(
      (listcanbo) => {
        console.log('a');
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
    localStorage.removeItem('token');
    this.alertify.message('Đã đăng xuất.');
    this.router.navigate(['/dang-nhap']);
  }
}
