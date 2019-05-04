import { Component, OnInit } from '@angular/core';
import { HoiDongService } from '../_services/hoi-dong.service';
import { GenerateSchoolYearPipe } from '../PipeHelper/generateSchoolYear.pipe';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-bo-phieu-info',
  templateUrl: './bo-phieu-info.component.html',
  styleUrls: ['./bo-phieu-info.component.scss'],
  providers: [ GenerateSchoolYearPipe ]
})
export class BoPhieuInfoComponent implements OnInit {
  isOpen = false;
  hoiDong: any;
  listDanhHieu: any;
  maHoiDong: string;
  isPermited = false;
  constructor(
    private hoiDongService: HoiDongService,
    private yearPipe: GenerateSchoolYearPipe,
    private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.checkLastHoiDong();
    this.checkQuyen();
  }
  checkQuyen() {
    const a = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    if (a.info.ma_quyen === '3') {
      this.isPermited = true;
    }
  }
  checkLastHoiDong() {
    this.hoiDongService.getLastHoiDong().subscribe(
      res => {
        if (res.trang_thai === 2) {
          this.isOpen = true;
          res.NamHoc.tu_ngay = this.yearPipe.transform(res.NamHoc.tu_ngay);
          this.hoiDong = res;
          this.maHoiDong = res.ma_hoi_dong;
        }
      }
    );
  }
  // checkThanhVien() {

  // }

}
