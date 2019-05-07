import { Component, OnInit } from '@angular/core';
import { KhenThuongService } from 'src/app/_services/khen-thuong.service';

@Component({
  selector: 'app-hinh-thuc-khen-thuong-ca-nhan-list',
  templateUrl: './hinh-thuc-khen-thuong-ca-nhan-list.component.html',
  styleUrls: ['./hinh-thuc-khen-thuong-ca-nhan-list.component.scss']
})
export class HinhThucKhenThuongCaNhanListComponent implements OnInit {

  myList: any[];
  constructor(private khenThuongService: KhenThuongService) { }
  ngOnInit() {
    this.NapDanhSach();
  }
  NapDanhSach() {
    this.khenThuongService.GetAllCaNhan().subscribe(next => {
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
