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
  bauChonThiDuaTT(Request) {
    return this.http.post(environment.apiUrl + 'bauchon/thiduatapthe', Request).pipe(map(
      (res) => {
        return res;
      }
    ));
  }
}
