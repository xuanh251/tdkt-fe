import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhenThuongService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  GetAllTapThe() {
    return this.http.get<any>(this.baseUrl + 'tapthekt/napdanhsach');
  }
  GetAllCaNhan() {
    return this.http.get<any>(this.baseUrl + 'canhankt/napdanhsach');
  }
}
