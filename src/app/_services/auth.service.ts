import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { SocketService } from './socket.service';
import { CanboService } from './canbo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(
    private http: HttpClient,
    private socket: SocketService,
    private canbo: CanboService
    ) { }
  // day la ham cua then service nay!!!
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          if (user.message !== 'isUsing') {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log(this.decodedToken);
          }
          return res;
        }
      })
    );
  }
  setActive(maCanBo) {
    return this.http.get(environment.apiUrl + 'canbo/setActive/' + maCanBo);
  }
  setDeactive(maCanBo) {
    return this.http.get(environment.apiUrl + 'canbo/setDeactive/' + maCanBo);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
