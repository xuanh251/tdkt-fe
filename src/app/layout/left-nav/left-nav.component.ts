import { Component, OnInit } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome-free';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  isAdmin = false;
  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    this.isAdmin = this.jwtHelper.decodeToken(localStorage.getItem('token')).info.ma_quyen === '2';
  }

}
