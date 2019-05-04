import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DonviService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListDonVi(): Observable<any> {
    return this.http.get<any>(this. baseUrl + 'listdonvi');
  }
  getDonVi(id): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'donvi/' + id);
  }
  createDonVi(requestdonvi: any): any {
    return this.http.post(environment.apiUrl + 'donvi/create', requestdonvi).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  updateDonVi(requestdonvi: any, uid: string): any {
    return this.http.put(environment.apiUrl + 'donvi/' + uid, requestdonvi).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  deleteDonVi(uid: string): any {
    return this.http.delete(environment.apiUrl + 'donvi/' + uid).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
}
