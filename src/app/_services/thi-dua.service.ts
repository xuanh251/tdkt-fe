import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThiDuaService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  GetAllTapThe() {
    return this.http.get<any>(this.baseUrl + 'tapthetd/napdanhsach');
  }
  GetAllCaNhan() {
    return this.http.get<any>(this.baseUrl + 'canhantd/napdanhsach');
  }

}
