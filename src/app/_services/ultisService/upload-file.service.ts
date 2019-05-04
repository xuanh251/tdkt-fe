import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }
  uploadImage(fd: FormData) {
    const userid = this.jwtHelperService.decodeToken(localStorage.getItem('token')).userId.uid;
    fd.append('uid', userid);
    const a = this.http.post(environment.apiUrl + 'upload', fd);
    return a.pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  }
}

