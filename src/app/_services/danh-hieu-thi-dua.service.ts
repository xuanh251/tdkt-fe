import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DanhHieuThiDuaService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getListDanhHieuThiDua(): Observable<any> {
    return this.http.get<any[]>(this. baseUrl + 'listdanhhieuthidua');
  }
  getDanhHieuThiDua(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'danhhieuthidua/' + id);
  }

  createDanhHieuThiDua(requestDanhHieuThiDua: any): any {
    return this.http.post(environment.apiUrl + 'danhhieuthidua/create', requestDanhHieuThiDua).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updateDanhHieuThiDua(requestDanhHieuThiDua: any, id: string): any {
    return this.http.put(environment.apiUrl + 'danhhieuthidua/' + id, requestDanhHieuThiDua).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  deleteDanhHieuThiDua(id: string): any {
    return this.http.delete(environment.apiUrl + 'danhhieuthidua/' + id).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
