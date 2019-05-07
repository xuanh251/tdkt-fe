import { Component, OnInit } from '@angular/core';
import { KhenThuongService } from 'src/app/_services/khen-thuong.service';

@Component({
  selector: 'app-hinh-thuc-khen-thuong-tap-the-list',
  templateUrl: './hinh-thuc-khen-thuong-tap-the-list.component.html',
  styleUrls: ['./hinh-thuc-khen-thuong-tap-the-list.component.scss']
})
export class HinhThucKhenThuongTapTheListComponent implements OnInit {

  myList: any[];
  constructor(private khenThuongService: KhenThuongService) { }
  ngOnInit() {
    this.NapDanhSach();
  }
  NapDanhSach() {
    this.khenThuongService.GetAllTapThe().subscribe(next => {
      const list = [];
      next.forEach(element => {
        if (element.HinhThucKhenThuong.length !== 0) {
          list.push(element);
        }
      });
      this.myList = list;
      console.log(next);
    });
  }

}
