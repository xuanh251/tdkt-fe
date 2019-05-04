import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanboService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListQuyenLimit(): Observable<any[]> {
    return this.http.get<any[]>(this. baseUrl + 'getquyenlimit');
  }
  getListCanBo(): Observable<any[]> {
    return this.http.get<any[]>(this. baseUrl + 'listcanbo');
  }
  getCanBo(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'canbo/' + id);
  }

  createCanBo(requestCanBo: any): any {
    return this.http.post(environment.apiUrl + 'canbo/create', requestCanBo).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updateCanBo(requestCanBo: any, id: string): any {
    return this.http.put(environment.apiUrl + 'canbo/' + id, requestCanBo).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  deleteCanBo(id: string): any {
    return this.http.delete(environment.apiUrl + 'canbo/' + id).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
