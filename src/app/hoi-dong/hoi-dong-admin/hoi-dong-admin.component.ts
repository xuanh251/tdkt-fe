import { Component, OnInit, OnDestroy } from '@angular/core';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { SocketService } from 'src/app/_services/socket.service';
import { NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalThanhvienComponent } from '../modal-thanhvien/modal-thanhvien.component';
import { GenerateSchoolYearPipe } from 'src/app/PipeHelper/generateSchoolYear.pipe';
import { ModalTheoDoiBauChonComponent } from '../modal-theo-doi-bau-chon/modal-theo-doi-bau-chon.component';
import { NgmodalThoigianmoComponent } from '../ngmodal-thoigianmo/ngmodal-thoigianmo.component';
import { ModalKetQuaBauChonTdComponent } from 'src/app/modal-ket-qua-bau-chon-td/modal-ket-qua-bau-chon-td.component';
import { BauChonService } from 'src/app/_services/bau-chon.service';

@Component({
  selector: 'app-hoi-dong-admin',
  templateUrl: './hoi-dong-admin.component.html',
  styleUrls: ['./hoi-dong-admin.component.scss'],
  providers: [GenerateSchoolYearPipe]
})
export class HoiDongAdminComponent implements OnInit, OnDestroy {
  hoidong: any;
  namhoc = 'Đang tải';
  tongthanhvien = 0;
  thanhvienCoMat = 0;
  thanhVienDangBauChon = 0;
  thanhVienDaBauChon = 0;
  listDanhHieuByHoiDong: any[];

  doiTuongBauChon: '';

  modalRef: NgbModalRef;

  ListTDTTDatYeuCau: any[];
  constructor(
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
    private socket: SocketService,
    private modalService: NgbModal,
    private yearPipe: GenerateSchoolYearPipe,
    private bauChonService: BauChonService
  ) {}
  ngOnInit() {
    this.getHoiDong();
    this.socket.getEventListener().subscribe(event => {
      if (event.type === 'message') {
        const data = event.data.content;
        const findStr = data + '';
        const off = findStr.indexOf('thoát');
        const on = findStr.indexOf('online');
        const bcxong = findStr.indexOf('đã bầu chọn xong');
        if (off !== -1 || on !== -1 || bcxong !== -1) {
          this.getListThanhVien();
        }
      }
    });
  }
  ngOnDestroy() {
    // this.socket.close();
  }
  getHoiDong() {
    this.hoiDongService.getLastHoiDong().subscribe(
      hoidong => {
        hoidong.NamHoc.tu_ngay = this.yearPipe.transform(
          hoidong.NamHoc.tu_ngay
        );
        this.hoidong = hoidong;
        this.getListThanhVien();
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
        console.log(error);
      }
    );
  }
  getListThanhVien() {
    this.hoiDongService
      .getListThanhVienByHoiDong(this.hoidong.ma_hoi_dong)
      .subscribe(
        (listthanhvien: any[]) => {
          if (this.tongthanhvien === 0 || this.thanhvienCoMat === 0) {
            this.tongthanhvien = listthanhvien.length;
            this.thanhvienCoMat = listthanhvien
              .filter(
                rs => rs.co_mat
              ).length;
          }
          this.thanhVienDangBauChon = listthanhvien
          .filter(
            rs => rs.co_mat && rs.CanBo.trang_thai && !rs.bau_chon
          ).length;
          this.thanhVienDaBauChon = listthanhvien.filter(
            rs => rs.co_mat && rs.bau_chon
          ).length;
          this.getlistDanhHieuByHoiDong();
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
          console.log(error);
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
          console.log(this.listDanhHieuByHoiDong);
          this.listDanhHieuByHoiDong.sort((a, b) => (a.ten_danh_hieu < b.ten_danh_hieu) ? 1 : -1);
        },
        error => {
          this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
          console.log(error);
        }
      );
  }
  openUpdateTimeModal(maDanhHieu, tenDanhHieu) {
    const dem = this.listDanhHieuByHoiDong.filter(rs => rs.trang_thai);
    if (dem.length > 0) {
      this.alertify.error('Không thể mở vì phiên bầu chọn trước đó chưa kết thúc!');
      return;
    } else {
      const modalRef = this.modalService.open(NgmodalThoigianmoComponent, {
        windowClass: 'modal-holder',
        centered: true,
        size: 'sm'
      });
      modalRef.componentInstance.maDanhHieu = maDanhHieu;
      modalRef.componentInstance.updateTime.subscribe($e => {
        this.modalService.dismissAll();
        this.KichHoat(maDanhHieu, tenDanhHieu, $e);
      });
    }
  }
  KichHoat(maDanhHieu, tenDanhHieu, soPhut) {
    this.thanhVienDangBauChon = 0;
    this.hoiDongService.activePhienBauChon(maDanhHieu).subscribe(
      next => {
        this.updateItemDanhHieu(maDanhHieu, true, 1, next.thoi_gian_mo, soPhut);
        this.socket.send(
          'Phiên bầu chọn cho danh hiệu ' + tenDanhHieu + ' đã mở!'
        );
        // localStorage.removeItem('danhHieuPush');
        this.openModalTheoDoi(maDanhHieu, tenDanhHieu, next.thoi_gian_mo, soPhut);
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
  }
  updateItemDanhHieu(maDanhHieu, trangThai, daBauChon, time, soPhut) {
    const updateItem = this.listDanhHieuByHoiDong.find(
      this.findMaDanhHieuToUpdate,
      maDanhHieu
    );
    const index = this.listDanhHieuByHoiDong.indexOf(updateItem);
    this.listDanhHieuByHoiDong[index].trang_thai = trangThai;
    this.listDanhHieuByHoiDong[index].da_bau_chon = daBauChon;
    this.listDanhHieuByHoiDong[index].thoi_gian_mo = time;
    this.listDanhHieuByHoiDong[index].so_phut = soPhut;
    console.log(this.listDanhHieuByHoiDong);
  }
  findMaDanhHieuToUpdate(newItem) {
    return newItem.ma_danh_hieu === this;
  }
  ketThuc(maDanhHieu, tenDanhHieu, thoiGianMo) {
    this.hoiDongService.DeactivePhienBauChon(maDanhHieu).subscribe(
      next => {
        this.updateItemDanhHieu(maDanhHieu, false, 2, 0, 0);
        this.socket.send(
          'Phiên bầu chọn cho danh hiệu ' + tenDanhHieu + ' đã đóng!'
        );
        this.openModalKetQua(maDanhHieu, tenDanhHieu, thoiGianMo);
        this.PushListBauChonTDTT(maDanhHieu);
      },
      error => {
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
  }
  PushListBauChonTDTT(maDanhHieu) {
    const a = {
      maDanhHieu,
      maHoiDong: this.hoidong.ma_hoi_dong
    };
    this.bauChonService.getListObjTTByDanhHieu(a).subscribe(
      (res: any[]) => {
        const listpush = [];
        res.forEach(elem => {
          const numOfBC = elem.BauChonThiDuaTapThe.filter(rs => rs.trang_thai_bau_chon).length;
          if ((numOfBC / this.thanhvienCoMat * 100) >= elem.danh_hieu.ti_le_dat) {
            elem.dat_yeu_cau = true;
            const obj = {
              ma_don_vi: elem.ma_don_vi
            };
            listpush.push(obj);
          } else {
            elem.dat_yeu_cau = false;
          }
        });
        const data = {
          ma_nam_hoc: this.hoidong.ma_nam_hoc,
          ma_hoi_dong: this.hoidong.ma_hoi_dong,
          ma_danh_hieu: maDanhHieu,
          list: listpush
        };
        console.log(data);
        // localStorage.setItem('danhHieuPush', this.maDanhHieu);
        this.bauChonService.PushListTDTTDatYeuCau(data).subscribe(
          (resp: any[]) => {
            console.log(resp);
          }
        );
      }
    );
  }
  onFinish(thoiGianMo, maDanhHieu, tenDanhHieu) {
    if (thoiGianMo !== 0) {
      this.ketThuc(maDanhHieu, tenDanhHieu, thoiGianMo);
    }
  }
  openModalTheoDoi(maDanhHieu, tenDanhHieu, thoiGianMo, soPhut) {
    this.modalRef = this.modalService.open(ModalTheoDoiBauChonComponent, {
      windowClass: 'modal-holder modal-fullsize',
      centered: true,
      backdropClass: 'light-blue-backdrop'
    });
    this.modalRef.componentInstance.tenDanhHieu = tenDanhHieu;
    this.modalRef.componentInstance.maDanhHieu = maDanhHieu;
    this.modalRef.componentInstance.thoiGianMo = thoiGianMo;
    this.modalRef.componentInstance.soPhut = soPhut;
    this.modalRef.componentInstance.hoiDong = this.hoidong;
  }
  openModalKetQua(maDanhHieu, tenDanhHieu, thoiGianMo) {
    const modalRef = this.modalService.open(ModalKetQuaBauChonTdComponent, {
      windowClass: 'modal-holder modal-fullsize',
      centered: true,
      backdropClass: 'light-blue-backdrop'
    });
    modalRef.componentInstance.tenDanhHieu = tenDanhHieu;
    modalRef.componentInstance.maDanhHieu = maDanhHieu;
    modalRef.componentInstance.thoiGianMo = thoiGianMo;
    modalRef.componentInstance.hoiDong = this.hoidong;
  }
}
