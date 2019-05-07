import { Component, OnInit } from '@angular/core';
import { ThiDuaService } from 'src/app/_services/thi-dua.service';

@Component({
  selector: 'app-danh-hieu-thi-dua-ca-nhan-list',
  templateUrl: './danh-hieu-thi-dua-ca-nhan-list.component.html',
  styleUrls: ['./danh-hieu-thi-dua-ca-nhan-list.component.scss']
})
export class DanhHieuThiDuaCaNhanListComponent implements OnInit {
  myList: any[];
  constructor(private thiduaService: ThiDuaService) { }
  ngOnInit() {
    this.NapDanhSach();
  }
  NapDanhSach() {
    this.thiduaService.GetAllCaNhan().subscribe(next => {
      const list = [];
      next.forEach(element => {
        if (element.DanhHieuThiDua.length !== 0) {
          list.push(element);
        }
      });
      this.myList = list;
      console.log(next);
    });
  }
}
