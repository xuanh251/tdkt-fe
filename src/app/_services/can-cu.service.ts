import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanCuService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListcancu(): Observable<any[]> {
    return this.http.get<any[]>(this. baseUrl + 'listcancu');
  }
  getListcancurieng(): Observable<any[]> {
    return this.http.get<any[]>(this. baseUrl + 'listcancurieng');
  }
  getcancu(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'cancu/' + id);
  }

  createcancu(requestcancu: any): any {
    return this.http.post(environment.apiUrl + 'cancu/create', requestcancu).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updatecancu(requestcancu: any, uid: string): any {
    return this.http.put(environment.apiUrl + 'cancu/' + uid, requestcancu).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  deletecancu(uid: string): any {
    return this.http.delete(environment.apiUrl + 'cancu/' + uid).pipe(map(
      (res: any) => {
        return res.data;
      }
    ));
  }
}
