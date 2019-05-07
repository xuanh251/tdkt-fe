import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HoiDongService {
  baseUrl = environment.apiUrl;
  requestCC = [];
  constructor(private http: HttpClient) { }
  moHoiDong(maHoiDong) {
    return this.http.get(environment.apiUrl + 'hoidong/open/' + maHoiDong).pipe(map(
      (res: any) => {
        return res;
      }));
  }
  dongHoiDong(maHoiDong) {
    return this.http.get(environment.apiUrl + 'hoidong/close/' + maHoiDong).pipe(map(
      (res: any) => {
        return res;
      }));
  }
  getListHoiDong() {
    return this.http.get<any>(this.baseUrl + 'hoidong/getlisthoidong/');
  }
  createHoiDong(Request: any): any {
    console.log(Request);
    return this.http.post(environment.apiUrl + 'hoidong/create', Request).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updateCanCuChung(idHoiDong: any, listCCC: any, listCCR: any): any {
    const a = {
      idHoiDong,
      listCCC,
      listCCR
    };
    console.log(a);
    return this.http.post(environment.apiUrl + 'hoidong/capnhatcancu', a).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  // tslint:disable-next-line:variable-name
  updateThanhVienHoiDong(ma_hoi_dong: string, ma_can_bo: number, ma_chuc_danh: number) {
    const a = {
      ma_hoi_dong, ma_can_bo, ma_chuc_danh
    };
    console.log(a);
    return this.http.post(environment.apiUrl + 'hoidong/capnhatthanhvien', a).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  // tslint:disable-next-line:variable-name
  getListThanhVienHoiDong(ma_hoi_dong: string) {
    const a = {
      ma_hoi_dong
    };
    return this.http.post(environment.apiUrl + 'hoidong/getlistthanhvien', a).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  getHoiDong(id) {
    return this.http.get<any>(this.baseUrl + 'hoidong/gethoidong/' + id);
  }
  getLastHoiDong() {
    return this.http.get<any>(this.baseUrl + 'hoidong/getlasthoidong/');
  }
  getListThanhVienByHoiDong(id: string) {
    return this.http.get<any>(this.baseUrl + 'hoidong/getlistthanhvienbyhoidong/' + id);
  }
  getListCanCuByHoiDong(id: string) {
    return this.http.get<any>(this.baseUrl + 'hoidong/getlistcancubyhoidong/' + id);
  }
  getListDanhHieuByHoiDong(id: string) {
    return this.http.get<any>(this.baseUrl + 'hoidong/getlistdanhhieu/' + id);
  }
  getListDHTDByHoiDong(id: string) {
    return this.http.get<any>(this.baseUrl + 'hoidong/getlistdanhhieubyhoidong/' + id);
  }
  activePhienBauChon(maDanhHieu) {
    return this.http.get<any>(this.baseUrl + 'hoidong/bauchon/active/' + maDanhHieu);
  }
  DeactivePhienBauChon(maDanhHieu) {
    return this.http.get<any>(this.baseUrl + 'hoidong/bauchon/deactive/' + maDanhHieu);
  }
  CapNhatDiemDanh(request) {
    const data = {
      request
    };
    return this.http.post(environment.apiUrl + 'hoidong/capnhatdiemdanh', data).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  CapNhatThoiGianBauChon(req) {
    return this.http.post(environment.apiUrl + 'hoidong/capnhatthoigianbauchon', req).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
