import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChucDanhService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListChucdanh(): Observable<any[]> {
    return this.http.get<any[]>(this. baseUrl + 'listchucdanh');
  }
  getChucdanh(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'chucdanh/' + id);
  }

  createChucdanh(requestchucdanh: any): any {
    return this.http.post(environment.apiUrl + 'chucdanh/create', requestchucdanh).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updateChucdanh(requestchucdanh: any, uid: string): any {
    return this.http.put(environment.apiUrl + 'chucdanh/' + uid, requestchucdanh).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  deleteChucdanh(uid: string): any {
    return this.http.delete(environment.apiUrl + 'chucdanh/' + uid).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
