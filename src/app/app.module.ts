import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';
import { DataTablesModule } from 'angular-datatables';

import { appRoutes } from './routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertifyService } from './_services/ultisService/alertify.service';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/ultisService/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AuthGuard } from './_guard/auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { UploadFileService } from './_services/ultisService/upload-file.service';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { AccountService } from './_services/account.service';

import { DonviListComponent } from './adminArea/donvi/donvi-list/donvi-list.component';
import { DonviEditComponent } from './adminArea/donvi/donvi-edit/donvi-edit.component';
import { DonviService } from './_services/donvi.service';
import { ChucvuEditComponent } from './adminArea/chucvu/chucvu-edit/chucvu-edit.component';
import { ChucvuListComponent } from './adminArea/chucvu/chucvu-list/chucvu-list.component';
import { ChucvuService } from './_services/chucvu.service';
import { CanboListComponent } from './adminArea/canbo/canbo-list/canbo-list.component';
import { CanboEditComponent } from './adminArea/canbo/canbo-edit/canbo-edit.component';
import { CanboService } from './_services/canbo.service';
import { PipeBooleanToHTMLPipe } from './PipeHelper/pipeBooleanToHTML.pipe';
import { NgDatePickerParserDateFormatService } from './_services/ng-date-picker-parser-date-format.service';
import { HinhThucKhenThuongListComponent } from './adminArea/hinh-thuc-khen-thuong/hinh-thuc-khen-thuong-list/hinh-thuc-khen-thuong-list.component';
import { HinhThucKhenThuongEditComponent } from './adminArea/hinh-thuc-khen-thuong/hinh-thuc-khen-thuong-edit/hinh-thuc-khen-thuong-edit.component';
import { DanhHieuThiDuaEditComponent } from './adminArea/danh-hieu-thi-dua/danh-hieu-thi-dua-edit/danh-hieu-thi-dua-edit.component';
import { DanhHieuThiDuaListComponent } from './adminArea/danh-hieu-thi-dua/danh-hieu-thi-dua-list/danh-hieu-thi-dua-list.component';
import { DanhHieuThiDuaTapTheListComponent } from './UserUI/danh-hieu-thi-dua-tap-the-list/danh-hieu-thi-dua-tap-the-list.component';
import { HoiDongComponent } from './hoi-dong/hoi-dong.component';
import { HoiDongEditComponent } from './hoi-dong/hoi-dong-edit/hoi-dong-edit.component';
import { CanCuComponent } from './adminArea/can-cu/can-cu.component';
import { NamHocComponent } from './adminArea/nam-hoc/nam-hoc.component';
import { CanCuEditComponent } from './adminArea/can-cu/can-cu-edit/can-cu-edit.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NamHocEditComponent } from './adminArea/nam-hoc/nam-hoc-edit/nam-hoc-edit.component';
import { BlockNumberComponent } from './home/block-number/block-number.component';
import { CharTdcnComponent } from './home/char-tdcn/char-tdcn.component';
import { CharTdttComponent } from './home/char-tdtt/char-tdtt.component';
import { CharKtcnComponent } from './home/char-ktcn/char-ktcn.component';
import { CharKtttComponent } from './home/char-kttt/char-kttt.component';
import { ChartsModule } from 'ng2-charts';
import { GenerateSchoolYearPipe } from './PipeHelper/generateSchoolYear.pipe';
import { CanCuService } from './_services/can-cu.service';
import { NamHocService } from './_services/nam-hoc.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HoiDongService } from './_services/hoi-dong.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ChucDanhComponent } from './adminArea/chuc-danh/chuc-danh.component';
import { ChucDanhEditComponent } from './adminArea/chuc-danh/chuc-danh-edit/chuc-danh-edit.component';
import { YesnoPipe } from './PipeHelper/yesno.pipe';
import { ThanhPhanComponent } from './hoi-dong/thanh-phan/thanh-phan.component';
import { HoiDongListComponent } from './hoi-dong/hoi-dong-list/hoi-dong-list.component';
import { GeneralComponent } from './general/general.component';
import { InQDHoiDongComponent } from './in-qd-hoi-dong/in-qd-hoi-dong.component';
import { TrangThaiHoiDongPipe } from './PipeHelper/trangThaiHoiDong.pipe';
import { XetThiDuaComponent } from './xet-thi-dua/xet-thi-dua.component';
import { XetKhenThuongComponent } from './xet-khen-thuong/xet-khen-thuong.component';
import { XetTdTapTheComponent } from './xet-thi-dua/xet-td-tap-the/xet-td-tap-the.component';
import { XetTdCaNhanComponent } from './xet-thi-dua/xet-td-ca-nhan/xet-td-ca-nhan.component';
import { XetKtTapTheComponent } from './xet-khen-thuong/xet-kt-tap-the/xet-kt-tap-the.component';
import { XetKtCaNhanComponent } from './xet-khen-thuong/xet-kt-ca-nhan/xet-kt-ca-nhan.component';
import { NgModalXtdttComponent } from './xet-thi-dua/ng-modal/ng-modal-xtdtt/ng-modal-xtdtt.component';
import { NgModalXtdcnComponent } from './xet-thi-dua/ng-modal/ng-modal-xtdcn/ng-modal-xtdcn.component';
import { NgModalXktcnComponent } from './xet-thi-dua/ng-modal/ng-modal-xktcn/ng-modal-xktcn.component';
import { NgModalXktttComponent } from './xet-thi-dua/ng-modal/ng-modal-xkttt/ng-modal-xkttt.component';
import { SocketService } from './_services/socket.service';
import { BoPhieuInfoComponent } from './bo-phieu-info/bo-phieu-info.component';
import { BauChonDhtdComponent } from './bau-chon-dhtd/bau-chon-dhtd.component';
import { BauChonHdktComponent } from './bau-chon-hdkt/bau-chon-hdkt.component';
import { CountdownModule } from 'ngx-countdown';
import { HoiDongAdminComponent } from './hoi-dong/hoi-dong-admin/hoi-dong-admin.component';
import { ModalThanhvienComponent } from './hoi-dong/modal-thanhvien/modal-thanhvien.component';
import { BauchondanhhieuPipe } from './PipeHelper/bauchondanhhieu.pipe';
import { ModalTheoDoiBauChonComponent } from './hoi-dong/modal-theo-doi-bau-chon/modal-theo-doi-bau-chon.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { environment } from 'src/environments/environment';
import { NumOfBauChonPipe } from './PipeHelper/numOfBauChon.pipe';
import { ModalDiemdanhComponent } from './hoi-dong/modal-diemdanh/modal-diemdanh.component';
import { NgmodalThoigianmoComponent } from './hoi-dong/ngmodal-thoigianmo/ngmodal-thoigianmo.component';
import { ModalKetQuaBauChonTdComponent } from './modal-ket-qua-bau-chon-td/modal-ket-qua-bau-chon-td.component';
import { ListDanhHieuThiDuaPipe } from './PipeHelper/listDanhHieuThiDua.pipe';
import { DanhHieuThiDuaCaNhanListComponent } from './UserUI/danh-hieu-thi-dua-ca-nhan-list/danh-hieu-thi-dua-ca-nhan-list.component';
import { HinhThucKhenThuongCaNhanListComponent } from './UserUI/hinh-thuc-khen-thuong-ca-nhan-list/hinh-thuc-khen-thuong-ca-nhan-list.component';
import { HinhThucKhenThuongTapTheListComponent } from './UserUI/hinh-thuc-khen-thuong-tap-the-list/hinh-thuc-khen-thuong-tap-the-list.component';
import { ListHinhThucKhenThuongPipe } from './PipeHelper/listHinhThucKhenThuong.pipe';
export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      TopNavComponent,
      LeftNavComponent,
      UserListComponent,
      UserEditComponent,
      DonviListComponent,
      DonviEditComponent,
      ChucvuEditComponent,
      ChucvuListComponent,
      CanboListComponent,
      CanboEditComponent,

      PipeBooleanToHTMLPipe,
      GenerateSchoolYearPipe,
      YesnoPipe,
      TrangThaiHoiDongPipe,
      BauchondanhhieuPipe,
      NumOfBauChonPipe,
      ListDanhHieuThiDuaPipe,
      ListHinhThucKhenThuongPipe,

      HinhThucKhenThuongListComponent,
      HinhThucKhenThuongEditComponent,
      DanhHieuThiDuaEditComponent,
      DanhHieuThiDuaListComponent,
      DanhHieuThiDuaTapTheListComponent,
      HoiDongComponent,
      HoiDongEditComponent,
      CanCuComponent,
      NamHocComponent,
      CanCuEditComponent,
      NamHocEditComponent,
      BlockNumberComponent,
      CharTdcnComponent,
      CharTdttComponent,
      CharKtcnComponent,
      CharKtttComponent,
      ChucDanhComponent,
      ChucDanhEditComponent,
      ThanhPhanComponent,
      HoiDongListComponent,
      GeneralComponent,
      InQDHoiDongComponent,
      XetThiDuaComponent,
      XetKhenThuongComponent,
      XetTdTapTheComponent,
      XetTdCaNhanComponent,
      XetKtTapTheComponent,
      XetKtCaNhanComponent,
      NgModalXtdttComponent,
      NgModalXtdcnComponent,
      NgModalXktcnComponent,
      NgModalXktttComponent,
      BoPhieuInfoComponent,
      BauChonDhtdComponent,
      BauChonHdktComponent,
      HoiDongAdminComponent,
      ModalThanhvienComponent,
      ModalTheoDoiBauChonComponent,
      ModalDiemdanhComponent,
      NgmodalThoigianmoComponent,
      ModalKetQuaBauChonTdComponent,
      DanhHieuThiDuaCaNhanListComponent,
      HinhThucKhenThuongCaNhanListComponent,
      HinhThucKhenThuongTapTheListComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      DataTablesModule,
      NgxSpinnerModule,
      ReactiveFormsModule,
      NgbModule,
      RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: [environment.ApiOriginUrl],
            blacklistedRoutes: [environment.ApiOriginUrl + '/api/auth']
         }
      }),
      SweetAlert2Module.forRoot({
         buttonsStyling: false,
         customClass: 'modal-content',
         confirmButtonClass: 'btn btn-primary',
         cancelButtonClass: 'btn'
      }),
      ArchwizardModule,
      ChartsModule,
      OwlDateTimeModule,
      OwlNativeDateTimeModule,
      BrowserAnimationsModule,
      NgMultiSelectDropDownModule.forRoot(),
      AngularMultiSelectModule,
      CountdownModule,
      ConfirmationPopoverModule.forRoot({
         confirmButtonType: 'success',
         cancelButtonType: 'danger',
         confirmText: '<i class="fas fa-check"></i> Xác nhận',
         cancelText: '<i class="far fa-window-close"></i> Huỷ' // set defaults here
       })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UploadFileService,
      AccountService,
      DonviService,
      ChucvuService,
      CanboService,
      CanCuService,
      NamHocService,
      HoiDongService,
      SocketService,
      {provide: NgbDateParserFormatter, useClass: NgDatePickerParserDateFormatService}
   ],
   bootstrap: [AppComponent],
   entryComponents: [
      NgModalXtdttComponent,
      NgModalXtdcnComponent,
      NgModalXktcnComponent,
      NgModalXktttComponent,
      ModalThanhvienComponent,
      ModalTheoDoiBauChonComponent,
      ModalDiemdanhComponent,
      NgmodalThoigianmoComponent,
      ModalKetQuaBauChonTdComponent
   ]
})
export class AppModule { }
