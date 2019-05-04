import { Component, OnInit } from '@angular/core';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { SocketService } from 'src/app/_services/socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalThanhvienComponent } from '../modal-thanhvien/modal-thanhvien.component';
import { GenerateSchoolYearPipe } from 'src/app/PipeHelper/generateSchoolYear.pipe';

@Component({
  selector: 'app-hoi-dong-admin',
  templateUrl: './hoi-dong-admin.component.html',
  styleUrls: ['./hoi-dong-admin.component.scss'],
  providers: [GenerateSchoolYearPipe]
})
export class HoiDongAdminComponent implements OnInit {
  hoidong: any;
  namhoc = 'Đang tải';
  tongthanhvien = 'Đang tải...';
  thanhvienonline = 'Đang tải...';
  listDanhHieuByHoiDong: any[];
  stoptime = 1556906577000;
  constructor(
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
    private socket: SocketService,
    private modalService: NgbModal,
    private yearPipe: GenerateSchoolYearPipe
  ) {}
  ngOnInit() {
    this.getHoiDong();
    this.socket.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        const data = event.data.content;
        const findStr = data + '';
        const off = findStr.indexOf('thoát');
        const on = findStr.indexOf('online');
        if (off !== -1 || on !== -1) {
          this.getListThanhVien();
        }
      }
    });
  }
  getHoiDong() {
    this.hoiDongService.getLastHoiDong().subscribe(
      hoidong => {
        hoidong.NamHoc.tu_ngay = this.yearPipe.transform(
          hoidong.NamHoc.tu_ngay
        );
        this.hoidong = hoidong;
        this.getListThanhVien();
        this.getlistDanhHieuByHoiDong();
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
      }
    );
  }
  getListThanhVien() {
    this.hoiDongService
      .getListThanhVienByHoiDong(this.hoidong.ma_hoi_dong)
      .subscribe(
        (listthanhvien: any[]) => {
          this.tongthanhvien = listthanhvien.length.toString();
          this.thanhvienonline = listthanhvien
            .filter(
              rs => rs.CanBo.trang_thai === true && rs.CanBo.ma_quyen !== 2
            )
            .length.toString();
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
        }
      );
  }
  open() {
    const modalRef = this.modalService.open(ModalThanhvienComponent, {
      windowClass: 'modal-holder',
      centered: true
    });
    modalRef.componentInstance.maHoiDong = this.hoidong.ma_hoi_dong;
  }
  getlistDanhHieuByHoiDong() {
    this.hoiDongService
      .getListDHTDByHoiDong(this.hoidong.ma_hoi_dong)
      .subscribe(
        (listdanhhieu: any[]) => {
          this.listDanhHieuByHoiDong = listdanhhieu;
          this.listDanhHieuByHoiDong.sort((a, b) => (a.ten_danh_hieu > b.ten_danh_hieu) ? 1 : -1);
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
        }
      );
  }
  kichHoat(maDanhHieu, tenDanhHieu) {
    const dem = this.listDanhHieuByHoiDong.filter(rs => rs.trang_thai);
    if (dem.length > 0) {
      this.alertify.error('Không thể mở vì phiên bầu chọn trước đó chưa kết thúc!');
      return;
    }
    this.hoiDongService.activePhienBauChon(maDanhHieu).subscribe(
      next => {
        this.updateItemDanhHieu(maDanhHieu, true, 1, next.thoi_gian_mo);
        this.socket.send(
          'Phiên bầu chọn cho danh hiệu ' + tenDanhHieu + ' đã mở!'
        );
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
  }
  updateItemDanhHieu(maDanhHieu, trangThai, daBauChon, time) {
    const updateItem = this.listDanhHieuByHoiDong.find(
      this.findMaDanhHieuToUpdate,
      maDanhHieu
    );
    const index = this.listDanhHieuByHoiDong.indexOf(updateItem);
    this.listDanhHieuByHoiDong[index].trang_thai = trangThai;
    this.listDanhHieuByHoiDong[index].da_bau_chon = daBauChon;
    this.listDanhHieuByHoiDong[index].thoi_gian_mo = time;
    console.log(this.listDanhHieuByHoiDong);
  }
  findMaDanhHieuToUpdate(newItem) {
    return newItem.ma_danh_hieu === this;
  }
  ketThuc(maDanhHieu, tenDanhHieu) {
    this.hoiDongService.DeactivePhienBauChon(maDanhHieu).subscribe(
      next => {
        this.updateItemDanhHieu(maDanhHieu, false, 2, 0);
        this.socket.send(
          'Phiên bầu chọn cho danh hiệu ' + tenDanhHieu + ' đã đóng!'
        );
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
  }
  onFinish(thoiGianMo, maDanhHieu, tenDanhHieu) {
    if (thoiGianMo !== 0) {
      this.ketThuc(maDanhHieu, tenDanhHieu);
    }
  }
  openModalTheoDoi() {
    return;
  }
}
