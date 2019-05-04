import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { SocketService } from '../_services/socket.service';
import { AlertifyService } from '../_services/ultisService/alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  public constructor(
    public authService: AuthService,
    private socket: SocketService,
    private alertify: AlertifyService,
    private jwtHelper: JwtHelperService
    ) {
      window.addEventListener('beforeunload', (e) => {
        const token = localStorage.getItem('token');
        if (token !== null) {
          const decodedToken = this.jwtHelper.decodeToken(token);
          this.authService.setDeactive(decodedToken.info.ma_can_bo).subscribe(
            (listcanbo) => {
              console.log('a');
            },
            error => {
              this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
            }
          );
        }
      });
    }
  loggedIn() {
    return this.authService.loggedIn();
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.setActive(decodedToken.info.ma_can_bo).subscribe(
        (listcanbo) => {
          console.log('a');
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
        }
      );
    }
    this.socket.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        const data = event.data.content;
        if (token !== null) {
          const decodedToken = this.jwtHelper.decodeToken(token);
          const hoten = decodedToken.info.ho_ten;
          // const maQuyen = decodedToken.info.ma_quyen;
          // const findStr = data + '';
          if (data !== 'Connected' && data !== 'Disconnected' && data !== 'Cán bộ ' + hoten + ' đã online!' && data !== 'Cán bộ ' + hoten + ' đã thoát!') {
            this.alertify.success(data);
          }
        }
      }
    });
  }
  public ngOnDestroy() {
    // this.socket.close();
  }

}
