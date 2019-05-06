import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BauChonService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getListObjTTByDanhHieu(Request) {
    return this.http.post(environment.apiUrl + 'bauchon/getlistobjttbydanhhieu', Request).pipe(map(
      (res) => {
        return res;
      }
    ));
  }
  getListObjCNByDanhHieu(Request) {
    return this.http.post(environment.apiUrl + 'bauchon/getlistobjcnbydanhhieu', Request).pipe(map(
      (res) => {
        return res;
      }
    ));
  }
  bauChonThiDuaTT(Request) {
    const a = {
      Request
    };
    return this.http.post(environment.apiUrl + 'bauchon/thiduatapthe', a).pipe(map(
      (res) => {
        return res;
      }
    ));
  }
  bauChonThiDuaCN(Request) {
    const a = {
      Request
    };
    return this.http.post(environment.apiUrl + 'bauchon/thiduacanhan', a).pipe(map(
      (res) => {
        return res;
      }
    ));
  }
  GetListDaBauChonTDTTByTVHD(maThanhPhan) {
    return this.http.get(environment.apiUrl + 'bauchon/listbcbytvhd/' + maThanhPhan);
  }
  PushListTDTTDatYeuCau(data) {
    return this.http.post(environment.apiUrl + 'bauchon/addlisttdttdatyeucau', data).pipe(map(
      (res) => {
        return res;
      }
    ));
  }
}
