import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // getAccounts(): Observable<any[]> {
  //   return this.http.get<any[]>(this. baseUrl + 'accounts');
  // }
  // getAccount(uid): Observable<any> {
  //   return this.http.get<any>(this.baseUrl + 'account/' + uid);
  // }

  // createAccount(requestAccount: any): any {
  //   return this.http.post(environment.apiUrl + 'account/create', requestAccount).pipe(map(
  //     (res: any) => {
  //       return res;
  //     }
  //   ));
  // }
  // updateAccount(requestAccount: any, uid: string): any {
  //   return this.http.put(environment.apiUrl + 'account/' + uid, requestAccount).pipe(map(
  //     (res: any) => {
  //       return res;
  //     }
  //   ));
  // }
  // deleteAccount(uid: string): any {
  //   return this.http.delete(environment.apiUrl + 'account/' + uid).pipe(map(
  //     (res: any) => {
  //       return res;
  //     }
  //   ));
  // }
}
