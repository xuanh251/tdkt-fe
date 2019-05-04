import { Component, OnInit, Input } from '@angular/core';
import { HoiDongService } from '../_services/hoi-dong.service';
import { BauChonService } from '../_services/bau-chon.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-bau-chon-dhtd',
  templateUrl: './bau-chon-dhtd.component.html',
  styleUrls: ['./bau-chon-dhtd.component.scss']
})
export class BauChonDhtdComponent implements OnInit {
  @Input() maHoiDong: string;
  listDanhHieu: any[];
  DanhHieuSetting: {};
  selectedItemsDanhHieu: any[];
  listXetBauChon: any[];
  listBauChon: any[];
  isTapThe = false;
  selectAll = false;
  maThanhPhan: string;
  constructor(
    private hoiDongService: HoiDongService,
    private bauChonService: BauChonService,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit() {
    this.getListDanhHieuByHoiDong();
    this.DanhHieuSetting = {
      singleSelection: true,
      primaryKey: 'ma_danh_hieu',
      labelKey: 'ten_danh_hieu',
      allowSearchFilter: true
    };
    this.maThanhPhan = this.jwtHelper.decodeToken(localStorage.getItem('token')).info.ma_can_bo;
  }
  getUnique(arr, comp) {
    const unique = arr
         .map(e => e[comp])
       // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }
  getListDanhHieuByHoiDong() {
    this.hoiDongService.getListDanhHieuByHoiDong(this.maHoiDong).subscribe(
      (res) => {
        this.listDanhHieu = this.getUnique(res, 'ma_danh_hieu');
      }
    );
  }
  bauChon() {
    this.listBauChon = [];
    this.listXetBauChon.forEach(element => {
      const item = {
        ma_thanh_phan: this.maThanhPhan,
        ma_xet: element.id,
        trang_thai_bau_chon: element.checked
      };
      this.listBauChon.push(item);
      this.bauChonService.bauChonThiDuaTT(this.listBauChon);
    });
  }
  onSelectDanhHieu() {
    const maDanhHieu = this.selectedItemsDanhHieu[0].ma_danh_hieu;
    this.getListObjByDanhHieu(maDanhHieu);
  }
  getListObjByDanhHieu(maDanhHieu) {
    const a = {
      maDanhHieu,
      maHoiDong: this.maHoiDong,
    };
    this.bauChonService.getListObjTTByDanhHieu(a).subscribe(
      (res: any[]) => {
        const A = res[0].ma_can_bo;
        if (A === undefined) {
          this.isTapThe = true;
        } else {
          this.isTapThe = false;
        }
        console.log(this.isTapThe);
        res.forEach(element => {
          element.checked = false;
        });
        this.listXetBauChon = res;
        console.log(this.listXetBauChon);
      }
    );
  }

}
