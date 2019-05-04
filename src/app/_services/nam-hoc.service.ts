import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NamHocService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  createNamHoc(request: any): any {
    return this.http.post(this.baseUrl + 'namhoc/create', request).pipe(map(
      (res: any) => {
        return res;
      }
    ));
  }
  getListNamHoc(): Observable<any> {
    return this.http.get<any>(this. baseUrl + 'namhoc/list');
  }
}
