import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HoiDongService } from '../_services/hoi-dong.service';
import { SocketService } from '../_services/socket.service';
import { BauChonService } from '../_services/bau-chon.service';

@Component({
  selector: 'app-modal-ket-qua-bau-chon-td',
  templateUrl: './modal-ket-qua-bau-chon-td.component.html',
  styleUrls: ['./modal-ket-qua-bau-chon-td.component.scss']
})
export class ModalKetQuaBauChonTdComponent implements OnInit {
  @Input() tenDanhHieu;
  @Input() maDanhHieu;
  @Input() thoiGianMo: number;
  @Input() hoiDong;
  today: number = Date.now();
  TongTVHD: number;
  SoTVCoMat: number;
  SoTVVangMat: number;
  SoTVDaBauChon: number;
  listXetBauChon: any;
  constructor(
    public activeModal: NgbActiveModal,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private hoiDongService: HoiDongService,
    private socket: SocketService,
    private bauChonService: BauChonService,
  ) { }

  ngOnInit() {
    this.getListThanhVien();
  }

  getListThanhVien() {
    this.hoiDongService
      .getListThanhVienByHoiDong(this.hoiDong.ma_hoi_dong)
      .subscribe(
        (listthanhvien: any[]) => {
          listthanhvien = listthanhvien.filter(rs => rs.ChucDanh.tham_gia_bo_phieu);
          this.TongTVHD = listthanhvien.length;
          this.SoTVCoMat = listthanhvien
            .filter(
              rs => rs.co_mat
            ).length;
          this.SoTVDaBauChon = listthanhvien.filter(
            rs => rs.co_mat && rs.bau_chon
          ).length;
          this.spinner.hide();
          this.getListObjTTByDanhHieu(this.maDanhHieu);
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi nạp thông tin thành viên!');
          console.log(error);
        }
      );
  }
  getListObjTTByDanhHieu(maDanhHieu) {
    const a = {
      maDanhHieu,
      maHoiDong: this.hoiDong.ma_hoi_dong,
    };
    this.bauChonService.getListObjTTByDanhHieu(a).subscribe(
      (res: any[]) => {
        console.log(res);
        this.listXetBauChon = res;
        this.listXetBauChon.forEach(elem => {
          const numOfBC = elem.BauChonThiDuaTapThe.filter(rs => rs.trang_thai_bau_chon).length;
          const numOfKBC = elem.BauChonThiDuaTapThe.filter(rs => !rs.trang_thai_bau_chon).length;
          elem.dongy = numOfBC;
          elem.tile_dy = (+numOfBC / this.SoTVCoMat) * 100;
          console.log(this.SoTVCoMat);
          elem.khongdongy = numOfKBC;
          elem.tile_kdy = (+numOfKBC / this.SoTVCoMat) * 100;
          if ((+numOfBC / this.SoTVCoMat * 100) >= elem.danh_hieu.ti_le_dat) {
            elem.dat_yeu_cau = true;
          } else {
            elem.dat_yeu_cau = false;
          }
        });
        console.log(this.listXetBauChon);
      }
    );
  }
}
