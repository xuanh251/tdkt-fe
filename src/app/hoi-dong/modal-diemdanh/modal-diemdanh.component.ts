import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';

@Component({
  selector: 'app-modal-diemdanh',
  templateUrl: './modal-diemdanh.component.html',
  styleUrls: ['./modal-diemdanh.component.scss']
})
export class ModalDiemdanhComponent implements OnInit {
  @Input() maHoiDong;
  listThanhVien: any[];
  listDiemDanh: any[];
  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
  ) { }

  ngOnInit() {
    this.getListThanhVien();
  }
  getListThanhVien() {
    this.spinner.show();
    this.hoiDongService.getListThanhVienByHoiDong(this.maHoiDong).subscribe(
      (listthanhvien: any) => {
        console.log(listthanhvien);
        this.listThanhVien = listthanhvien;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi nạp danh sách thành viên!');
        console.log(error);
      }
    );
  }
  CapNhatDiemDanh() {
    this.listDiemDanh = [];
    this.listThanhVien.forEach(element => {
      const obj = {
        ma_thanh_phan: element.ma_thanh_phan,
        co_mat: element.co_mat
      };
      this.listDiemDanh.push(obj);
    });
    this.hoiDongService.CapNhatDiemDanh(this.listDiemDanh).subscribe(next => {this.alertify.success(next); }, error => {this.alertify.error('Đã xảy ra lỗi!'); });
  }

}
