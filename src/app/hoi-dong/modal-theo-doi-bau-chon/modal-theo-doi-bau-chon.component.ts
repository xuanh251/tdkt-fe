import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';
import { BauChonService } from 'src/app/_services/bau-chon.service';
import { SocketService } from 'src/app/_services/socket.service';

@Component({
  selector: 'app-modal-theo-doi-bau-chon',
  templateUrl: './modal-theo-doi-bau-chon.component.html',
  styleUrls: ['./modal-theo-doi-bau-chon.component.scss']
})
export class ModalTheoDoiBauChonComponent implements OnInit {
  @Input() tenDanhHieu;
  @Input() maDanhHieu;
  @Input() thoiGianMo: number;
  @Input() soPhut: number;
  @Input() hoiDong;
  ListThanhVien: any[];
  ListDatYeuCau: any[];
  listXetBauChon: any[];
  today: number = Date.now();

  TongTVHD: number;
  SoTVCoMat: number;
  SoTVVangMat: number;
  SoTVDangBauChon: number;
  SoTVDaBauChon: number;

  constructor(
    public activeModal: NgbActiveModal,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private hoiDongService: HoiDongService,
    private socket: SocketService,
    private bauChonService: BauChonService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getListObjTTByDanhHieu(this.maDanhHieu);
    this.socket.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        const data = event.data.content;
        const pbc = data + ''.indexOf('đã bầu chọn xong');
        if (pbc !== -1) {
          this.getListObjTTByDanhHieu(this.maDanhHieu);
        }
      }
    });
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
          this.SoTVDangBauChon = listthanhvien
            .filter(
              rs => rs.co_mat && rs.CanBo.trang_thai && !rs.bau_chon
            ).length;
          this.SoTVDaBauChon = listthanhvien.filter(
            rs => rs.co_mat && rs.bau_chon
          ).length;
          this.spinner.hide();
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
        this.listXetBauChon = res;
        this.getListThanhVien();
      }
    );
  }
}
