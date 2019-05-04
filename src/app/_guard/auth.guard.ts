import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/ultisService/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    localStorage.removeItem('token');
    this.alertify.error('Đăng nhập để tiếp tục!');
    this.router.navigate(['dang-nhap']);
    return false;
  }
}
