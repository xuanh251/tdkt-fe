import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HinhThucKhenThuongService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListHinhThucKhenThuong(): Observable<any[]> {
    return this.http.get<any[]>(this. baseUrl + 'listhinhthuckhenthuong');
  }
  getHinhThucKhenThuong(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'hinhthuckhenthuong/' + id);
  }

  createHinhThucKhenThuong(requestHinhThucKhenThuong: any): any {
    return this.http.post(environment.apiUrl + 'hinhthuckhenthuong/create', requestHinhThucKhenThuong).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updateHinhThucKhenThuong(requestHinhThucKhenThuong: any, id: string): any {
    return this.http.put(environment.apiUrl + 'hinhthuckhenthuong/' + id, requestHinhThucKhenThuong).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  deleteHinhThucKhenThuong(id: string): any {
    return this.http.delete(environment.apiUrl + 'hinhthuckhenthuong/' + id).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
