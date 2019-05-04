import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-thanhvien',
  templateUrl: './modal-thanhvien.component.html',
  styleUrls: ['./modal-thanhvien.component.scss']
})
export class ModalThanhvienComponent implements OnInit {
  @Input() maHoiDong;
  listThanhVien: any;
  constructor(
    public activeModal: NgbActiveModal,
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getListThanhVien();
  }
  getListThanhVien() {
    console.log(this.listThanhVien);
    this.spinner.show();
    this.hoiDongService.getListThanhVienByHoiDong(this.maHoiDong).subscribe(
      (listthanhvien: any) => {
        this.listThanhVien = listthanhvien;
        console.log(listthanhvien);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi nạp thông tin hội đồng!');
      }
    );
  }

}
