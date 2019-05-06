import { Component, OnInit } from '@angular/core';
import { HoiDongService } from '../_services/hoi-dong.service';
import { AlertifyService } from '../_services/ultisService/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { GenerateSchoolYearPipe } from '../PipeHelper/generateSchoolYear.pipe';
import {Location} from '@angular/common';
@Component({
  selector: 'app-in-qd-hoi-dong',
  templateUrl: './in-qd-hoi-dong.component.html',
  styleUrls: ['./in-qd-hoi-dong.component.scss'],
  providers: [ GenerateSchoolYearPipe ]
})
export class InQDHoiDongComponent implements OnInit {

  hoidong: any;
  listCanCu: [];
  listThanhVien: [];
  id: string;
  constructor(
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
    private activatedRouter: ActivatedRoute,
    private yearPipe: GenerateSchoolYearPipe,
    private location: Location) {
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      this.getHoiDong();
      this.getListCanCu();
      this.getListThanhVien();
    }

  ngOnInit() {
  }
  backClicked() {
    this.location.back();
  }
  getHoiDong() {
    this.hoiDongService.getHoiDong(this.id).subscribe(
      hoidong => {
        hoidong.NamHoc.tu_ngay = this.yearPipe.transform(hoidong.NamHoc.tu_ngay);
        this.hoidong = hoidong;
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
      }
    );
  }
  getListCanCu() {
    this.hoiDongService.getListCanCuByHoiDong(this.id).subscribe(
      listcancu => {
        this.listCanCu = listcancu;
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
      }
    );
  }
  getListThanhVien() {
    this.hoiDongService.getListThanhVienByHoiDong(this.id).subscribe(
      listthanhvien => {
        this.listThanhVien = listthanhvien;
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
        console.log(error);
      }
    );
  }
  printComponent(cmpName) {
    $('#printButton').hide();
    $('#goBack').hide();
    window.print();
    $('#printButton').show();
    $('#goBack').show();
}

}
