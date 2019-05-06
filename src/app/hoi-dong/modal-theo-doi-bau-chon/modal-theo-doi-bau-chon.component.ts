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
  @Input() thoiGianMo;
  @Input() hoiDong;
  ListThanhVien: any[];
  ListDatYeuCau: any[];
  listXetBauChon: any[];
  total: number;
  ketThuc = false;
  constructor(
    public activeModal: NgbActiveModal,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private hoiDongService: HoiDongService,
    private socket: SocketService,
    private bauChonService: BauChonService,
  ) { }

  ngOnInit() {
    console.log(this.maDanhHieu);
    if (this.thoiGianMo === 0) {
      this.ketThuc = true;
    } else {
      this.ketThuc = false;
    }
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
          this.total = listthanhvien.length;
          this.spinner.hide();
          if (this.thoiGianMo === 0) {
            this.getListDatYeuCau();
          }
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi nạp thông tin thành viên!');
          console.log(error);
        }
      );
  }
  onFinish(thoiGianMo) {
    if (thoiGianMo !== 0) {
      this.ketThuc = true;
      this.getListDatYeuCau();
    }
  }
  getListDatYeuCau() {
    this.ListDatYeuCau = [];
    if (this.ketThuc) {
      this.listXetBauChon.forEach(elem => {
        const numOfBC = elem.BauChonThiDuaTapThe.filter(rs => rs.trang_thai_bau_chon).length;
        if ((numOfBC / this.total * 100) >= elem.ti_le_dat) {
          elem.dat_yeu_cau = true;
          const obj = {
            ma_don_vi: elem.ma_don_vi
          };
          this.ListDatYeuCau.push(obj);
        } else {
          elem.dat_yeu_cau = false;
        }
      });
      this.PushListTDTTDatYeuCau();
    }
  }
  PushListTDTTDatYeuCau() {
    if (localStorage.getItem('danhHieuPush') === undefined || localStorage.getItem('danhHieuPush') !== this.maDanhHieu + '') {
      const data = {
        ma_nam_hoc: this.hoiDong.ma_nam_hoc,
        ma_hoi_dong: this.hoiDong.ma_hoi_dong,
        ma_danh_hieu: this.maDanhHieu,
        list: this.ListDatYeuCau
      };
      console.log(data);
      localStorage.setItem('danhHieuPush', this.maDanhHieu);
      this.bauChonService.PushListTDTTDatYeuCau(data).subscribe(
        (res: any[]) => {
          console.log(res);
        }
      );
    }
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
