import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HoiDongService } from '../_services/hoi-dong.service';
import { AlertifyService } from '../_services/ultisService/alertify.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocketService } from '../_services/socket.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDiemdanhComponent } from './modal-diemdanh/modal-diemdanh.component';

@Component({
  selector: 'app-hoi-dong',
  templateUrl: './hoi-dong.component.html',
  styleUrls: ['./hoi-dong.component.scss']
})
export class HoiDongComponent implements OnInit, AfterViewInit {

  listhoidong: any[];
  baseUrl = window.origin + '/inqd-hoidong/';
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  isAdmin = false;
  constructor(
    private hoiDongService: HoiDongService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private socket: SocketService,
    private jwtHelper: JwtHelperService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.isAdmin = this.jwtHelper.decodeToken(localStorage.getItem('token')).info.ma_quyen === '2';
    this.spinner.show();
    this.GetListHoiDong();
  }
  GetListHoiDong() {
    this.hoiDongService.getListHoiDong().subscribe(
      listhoidong => {
        this.listhoidong = listhoidong;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi nạp danh sách hội đồng!');
      }
    );
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
    }, 1000);
  }
  moHoiDong(maHoiDong) {
    this.spinner.show();
    this.hoiDongService.moHoiDong(maHoiDong).subscribe(
      next => {
        this.GetListHoiDong();
        this.socket.send('Hội đồng ' + maHoiDong + ' đã mở');
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
  }
  dongHoiDong(maHoiDong) {
    this.spinner.show();
    this.hoiDongService.dongHoiDong(maHoiDong).subscribe(
      next => {
        this.alertify.success(next);
        this.GetListHoiDong();
        this.socket.send('Hội đồng ' + maHoiDong + ' đã đóng');
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi!');
      }
    );
  }
  showModalDiemDanh(maHoiDong) {
    const modalRef = this.modalService.open(ModalDiemdanhComponent, {
      windowClass: 'modal-holder',
      centered: true
    });
    modalRef.componentInstance.maHoiDong = maHoiDong;
  }
}
