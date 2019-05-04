import { Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { DonviListComponent } from './adminArea/donvi/donvi-list/donvi-list.component';
import { DonviEditComponent } from './adminArea/donvi/donvi-edit/donvi-edit.component';
import { ChucvuListComponent } from './adminArea/chucvu/chucvu-list/chucvu-list.component';
import { ChucvuEditComponent } from './adminArea/chucvu/chucvu-edit/chucvu-edit.component';
import { CanboListComponent } from './adminArea/canbo/canbo-list/canbo-list.component';
import { CanboEditComponent } from './adminArea/canbo/canbo-edit/canbo-edit.component';
import { DanhHieuThiDuaListComponent } from './adminArea/danh-hieu-thi-dua/danh-hieu-thi-dua-list/danh-hieu-thi-dua-list.component';
import { DanhHieuThiDuaEditComponent } from './adminArea/danh-hieu-thi-dua/danh-hieu-thi-dua-edit/danh-hieu-thi-dua-edit.component';
import { HinhThucKhenThuongListComponent } from './adminArea/hinh-thuc-khen-thuong/hinh-thuc-khen-thuong-list/hinh-thuc-khen-thuong-list.component';
import { HinhThucKhenThuongEditComponent } from './adminArea/hinh-thuc-khen-thuong/hinh-thuc-khen-thuong-edit/hinh-thuc-khen-thuong-edit.component';
import { DanhHieuThiDuaTapTheListComponent } from './UserUI/danh-hieu-thi-dua-tap-the-list/danh-hieu-thi-dua-tap-the-list.component';
import { HoiDongComponent } from './hoi-dong/hoi-dong.component';
import { HoiDongEditComponent } from './hoi-dong/hoi-dong-edit/hoi-dong-edit.component';
import { CanCuComponent } from './adminArea/can-cu/can-cu.component';
import { CanCuEditComponent } from './adminArea/can-cu/can-cu-edit/can-cu-edit.component';
import { ChucDanhComponent } from './adminArea/chuc-danh/chuc-danh.component';
import { ChucDanhEditComponent } from './adminArea/chuc-danh/chuc-danh-edit/chuc-danh-edit.component';
import { GeneralComponent } from './general/general.component';
import { InQDHoiDongComponent } from './in-qd-hoi-dong/in-qd-hoi-dong.component';
import { XetThiDuaComponent } from './xet-thi-dua/xet-thi-dua.component';
import { XetKhenThuongComponent } from './xet-khen-thuong/xet-khen-thuong.component';
import { BoPhieuInfoComponent } from './bo-phieu-info/bo-phieu-info.component';
import { HoiDongAdminComponent } from './hoi-dong/hoi-dong-admin/hoi-dong-admin.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      { path: 'dang-nhap', component: LoginComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'quan-tri',
        canActivate: [AuthGuard],
        children: [
          { path: 'nguoi-dung', component: UserListComponent },
          { path: 'nguoi-dung/:uid', component: UserEditComponent },
          { path: 'don-vi', component: DonviListComponent },
          { path: 'don-vi/:id', component: DonviEditComponent },
          { path: 'chuc-vu', component: ChucvuListComponent },
          { path: 'chuc-vu/:id', component: ChucvuEditComponent },
          { path: 'can-bo', component: CanboListComponent },
          { path: 'can-bo/:id', component: CanboEditComponent },
          {
            path: 'danh-hieu-thi-dua',
            component: DanhHieuThiDuaListComponent
          },
          {
            path: 'danh-hieu-thi-dua/:id',
            component: DanhHieuThiDuaEditComponent
          },
          {
            path: 'hinh-thuc-khen-thuong',
            component: HinhThucKhenThuongListComponent
          },
          {
            path: 'hinh-thuc-khen-thuong/:id',
            component: HinhThucKhenThuongEditComponent
          },
          {
            path: 'can-cu',
            component: CanCuComponent
          },
          {
            path: 'can-cu/:id',
            component: CanCuEditComponent
          },
          {
            path: 'chuc-danh',
            component: ChucDanhComponent
          },
          {
            path: 'chuc-danh/:id',
            component: ChucDanhEditComponent
          }
        ]
      },
      {
        path: 'danh-hieu-thi-dua/tap-the',
        canActivate: [AuthGuard],
        component: DanhHieuThiDuaTapTheListComponent
      },
      {
        path: 'hoi-dong',
        canActivate: [AuthGuard],
        component: HoiDongComponent
      },
      {
        path: 'hoi-dong/xet-thi-dua',
        canActivate: [AuthGuard],
        component: XetThiDuaComponent
      },
      {
        path: 'hoi-dong/admin',
        canActivate: [AuthGuard],
        component: HoiDongAdminComponent
      },
      {
        path: 'hoi-dong/xet-khen-thuong',
        canActivate: [AuthGuard],
        component: XetKhenThuongComponent
      },
      {
        path: 'hoi-dong/edit/:id',
        canActivate: [AuthGuard],
        component: HoiDongEditComponent
      },
      {
        path: 'bo-phieu/check',
        canActivate: [AuthGuard],
        component: BoPhieuInfoComponent
      }
    ]
  },
  { path: 'inqd-hoidong/:id', component: InQDHoiDongComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
