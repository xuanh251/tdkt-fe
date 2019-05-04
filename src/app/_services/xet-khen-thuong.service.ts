import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class XetKhenThuongService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
   // Tập thể
   capNhatTapThe(req) {
    return this.http.post(this.baseUrl + 'xetkhenthuong/tapthe/capnhat', req).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  // tslint:disable-next-line:variable-name
  getAllTapThe(ma_hoi_dong: string) {
    return this.http.get<any>(this.baseUrl + 'xetkhenthuong/tapthe/danhsach/' + ma_hoi_dong);
  }
  getXetKTTTById(id: number) {
    return this.http.get<any>(this.baseUrl + 'xetkhenthuong/tapthe/getobj/' + id);
  }
  deleteObjKTTT(id: number): any {
    return this.http.delete(environment.apiUrl + 'xetkhenthuong/tapthe/' + id).pipe(map(
      (res: any) => {
        return res.data;
      }
    ));
  }
  // -------------------------------------------------------------------------------------------
  // Cá nhân
  capNhatCaNhan(req) {
    return this.http.post(this.baseUrl + 'xetkhenthuong/canhan/capnhat', req).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  // tslint:disable-next-line:variable-name
  getAllCaNhan(ma_hoi_dong: string) {
    return this.http.get<any>(this.baseUrl + 'xetkhenthuong/canhan/danhsach/' + ma_hoi_dong);
  }
  getXetKTCNById(id: number) {
    return this.http.get<any>(this.baseUrl + 'xetkhenthuong/canhan/getobj/' + id);
  }
  deleteObjKTCN(id: number): any {
    return this.http.delete(environment.apiUrl + 'xetkhenthuong/canhan/' + id).pipe(map(
      (res: any) => {
        return res.data;
      }
    ));
  }
}
