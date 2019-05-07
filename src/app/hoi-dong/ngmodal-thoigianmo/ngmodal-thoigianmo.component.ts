import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HoiDongService } from 'src/app/_services/hoi-dong.service';

@Component({
  selector: 'app-ngmodal-thoigianmo',
  templateUrl: './ngmodal-thoigianmo.component.html',
  styleUrls: ['./ngmodal-thoigianmo.component.scss']
})
export class NgmodalThoigianmoComponent implements OnInit {
  @Input() maDanhHieu;
  @Output() updateTime = new EventEmitter<number>();
  thoiGian: number;
  constructor(
    public activeModal: NgbActiveModal,
    public hoiDongService: HoiDongService
  ) { }
  ngOnInit() {
    console.log(this.maDanhHieu);
  }
  CapNhatThoiGian() {
    const req = {
      ma_danh_hieu: this.maDanhHieu,
      so_phut: this.thoiGian
    };
    this.hoiDongService.CapNhatThoiGianBauChon(req).subscribe(next => {
      if (next === true) {
        this.updateTime.emit(this.thoiGian);
      }
    });
  }

}
