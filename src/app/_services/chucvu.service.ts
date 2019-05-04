import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChucvuService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListChucVu(): Observable<any[]> {
    return this.http.get<any[]>(this. baseUrl + 'listchucvu');
  }
  getChucVu(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'chucvu/' + id);
  }

  createChucVu(requestchucvu: any): any {
    return this.http.post(environment.apiUrl + 'chucvu/create', requestchucvu).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updateChucVu(requestchucvu: any, uid: string): any {
    return this.http.put(environment.apiUrl + 'chucvu/' + uid, requestchucvu).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  deleteChucVu(uid: string): any {
    return this.http.delete(environment.apiUrl + 'chucvu/' + uid).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
