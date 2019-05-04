import { Component, OnInit } from '@angular/core';
import { HoiDongService } from '../_services/hoi-dong.service';
import { AlertifyService } from '../_services/ultisService/alertify.service';

@Component({
  selector: 'app-xet-thi-dua',
  templateUrl: './xet-thi-dua.component.html',
  styleUrls: ['./xet-thi-dua.component.scss']
})
export class XetThiDuaComponent implements OnInit {
  hoidong: any;
  haveHoiDong: boolean;
  constructor(
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
    ) { }
  ngOnInit() {
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
