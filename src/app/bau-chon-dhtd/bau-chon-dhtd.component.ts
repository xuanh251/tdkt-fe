import { Component, OnInit, Input } from '@angular/core';
import { HoiDongService } from '../_services/hoi-dong.service';
import { BauChonService } from '../_services/bau-chon.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../_services/ultisService/alertify.service';
import { SocketService } from '../_services/socket.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bau-chon-dhtd',
  templateUrl: './bau-chon-dhtd.component.html',
  styleUrls: ['./bau-chon-dhtd.component.scss']
})
export class BauChonDhtdComponent implements OnInit {
  @Input() maHoiDong: string;
  listXetBauChon: any[];
  listBauChon: any[];
  isTapThe = false;
  selectAll = false;
  thanhVienHDInfo: any;
  maThanhPhan: number;
  maCanBo: number;
  listDanhHieuByHoiDong: any[];
  PhienBCDaMo = false;
  DanhHieuInfo: any;
  DaBauChon = false;
  XemKetQua = false;
  listDaBauChon: any[];
  constructor(
    private hoiDongService: HoiDongService,
    private bauChonService: BauChonService,
    private jwtHelper: JwtHelperService,
    private alertify: AlertifyService,
    private socket: SocketService,
    private hoidongService: HoiDongService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.checkMoPhienBC();
    this.getMaThanhPhan();
    this.maCanBo = this.jwtHelper.decodeToken(localStorage.getItem('token')).info.ma_can_bo;
    this.socket.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        const data = event.data.content;
        const pbc = data + ''.indexOf('Phiên bầu chọn');
        if (pbc !== -1) {
          this.checkMoPhienBC();
          this.checkDaBauChon(this.maThanhPhan);
          this.XemKetQua = false;
          this.DaBauChon = false;
        }
      }
    });
  }
  xemKetQua() {
    this.XemKetQua = true;
  }
  checkDaBauChon(maThanhPhan) {
    this.bauChonService.GetListDaBauChonTDTTByTVHD(maThanhPhan).subscribe(
      (next: any[]) => {
        if (this.DanhHieuInfo !== undefined) {
          this.listDaBauChon = next.filter(rs => rs.XetThiDuaTapThe.ma_hoi_dong === this.maHoiDong && rs.XetThiDuaTapThe.ma_danh_hieu === this.DanhHieuInfo.ma_danh_hieu);
          if (this.listDaBauChon.length > 0) {
            console.log(this.listDaBauChon);
            this.DaBauChon = true;
          }
        }
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
  }
  getMaThanhPhan() {
    this.hoidongService.getListThanhVienByHoiDong(this.maHoiDong).subscribe(
      (next: any[]) => {
        this.thanhVienHDInfo = next.filter(rs => rs.ma_can_bo === this.maCanBo)[0];
        this.maThanhPhan = this.thanhVienHDInfo.ma_thanh_phan;
        this.checkDaBauChon(this.maThanhPhan);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }
  checkMoPhienBC() {
    this.hoiDongService
      .getListDHTDByHoiDong(this.maHoiDong)
      .subscribe(
        (listdanhhieu: any[]) => {
          const lrs = listdanhhieu.filter(rs => rs.trang_thai);
          if (lrs.length > 0) {
            this.PhienBCDaMo = true;
            this.DanhHieuInfo = lrs[0];
            if (this.DanhHieuInfo.doi_tuong_ap_dung === 'Tập thể') {
              this.isTapThe = true;
              this.getListObjTTByDanhHieu(this.DanhHieuInfo.ma_danh_hieu);
            } else {
              this.isTapThe = false;
              this.getListObjCNByDanhHieu(this.DanhHieuInfo.ma_danh_hieu);
            }
          } else {
            this.PhienBCDaMo = false;
          }
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
        }
      );
  }
  bauChon() {
    this.listBauChon = [];
    this.listXetBauChon.forEach(element => {
      const item = {
        ma_thanh_phan: this.maThanhPhan,
        ma_xet: element.id,
        trang_thai_bau_chon: element.checked
      };
      this.listBauChon.push(item);
    });
    console.log(this.listBauChon);
    if (this.isTapThe) {
      this.bauChonService.bauChonThiDuaTT(this.listBauChon).subscribe(
        (res) => {
          this.alertify.success('Bầu chọn thành công! Vui lòng chờ phiên bầu chọn tiếp theo.');
          this.checkDaBauChon(this.maThanhPhan);
          this.socket.send('Cán bộ ' + this.jwtHelper.decodeToken(localStorage.getItem('token')).info.ho_ten + ' đã bầu chọn xong!');
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
        }
      );
    } else {
      this.bauChonService.bauChonThiDuaCN(this.listBauChon).subscribe(
        (res) => {
          this.alertify.success('Bầu chọn thành công! Vui lòng chờ phiên bầu chọn tiếp theo.');
          console.log(res);
        },
        err => {
          this.alertify.error('Đã xảy ra lỗi!');
        }
      );
    }
  }
  getListObjTTByDanhHieu(maDanhHieu) {
    const a = {
      maDanhHieu,
      maHoiDong: this.maHoiDong,
    };
    this.bauChonService.getListObjTTByDanhHieu(a).subscribe(
      (res: any[]) => {
        res.forEach(element => {
          element.checked = false;
        });
        this.listXetBauChon = res;
        console.log(res);
      }
    );
  }
  getListObjCNByDanhHieu(maDanhHieu) {
    const a = {
      maDanhHieu,
      maHoiDong: this.maHoiDong,
    };
    this.bauChonService.getListObjCNByDanhHieu(a).subscribe(
      (res: any[]) => {
        res.forEach(element => {
          element.checked = false;
        });
        this.listXetBauChon = res;
      }
    );
  }
}
