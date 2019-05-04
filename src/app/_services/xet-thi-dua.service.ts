import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XetThiDuaService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // Tập thể
  capNhatTapThe(req) {
    return this.http.post(this.baseUrl + 'xetthidua/tapthe/capnhat', req).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  // tslint:disable-next-line:variable-name
  getAllTapThe(ma_hoi_dong: string) {
    return this.http.get<any>(this.baseUrl + 'xetthidua/tapthe/danhsach/' + ma_hoi_dong);
  }
  getXetTDTTById(id: number) {
    return this.http.get<any>(this.baseUrl + 'xetthidua/tapthe/getobj/' + id);
  }
  deleteObjTDTT(id: number): any {
    return this.http.delete(environment.apiUrl + 'xetthidua/tapthe/' + id).pipe(map(
      (res: any) => {
        return res.data;
      }
    ));
  }
  // -------------------------------------------------------------------------------------------
  // Cá nhân
  capNhatCaNhan(req) {
    return this.http.post(this.baseUrl + 'xetthidua/canhan/capnhat', req).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  // tslint:disable-next-line:variable-name
  getAllCaNhan(ma_hoi_dong: string) {
    return this.http.get<any>(this.baseUrl + 'xetthidua/canhan/danhsach/' + ma_hoi_dong);
  }
  getXetTDCNById(id: number) {
    return this.http.get<any>(this.baseUrl + 'xetthidua/canhan/getobj/' + id);
  }
  deleteObjTDCN(id: number): any {
    return this.http.delete(environment.apiUrl + 'xetthidua/canhan/' + id).pipe(map(
      (res: any) => {
        return res.data;
      }
    ));
  }
}
