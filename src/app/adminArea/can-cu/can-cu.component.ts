import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CanCuService } from 'src/app/_services/can-cu.service';

@Component({
  selector: 'app-can-cu',
  templateUrl: './can-cu.component.html',
  styleUrls: ['./can-cu.component.scss']
})
export class CanCuComponent implements OnInit, AfterViewInit {

  listcancu: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor(
    private cancuService: CanCuService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.loadcancu();
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
      this.spinner.hide();
    }, 300);
  }
  loadcancu() {
    this.cancuService.getListcancu().subscribe(
      (listcancu: any[]) => {
        this.listcancu = listcancu;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }

  deletecancu(uid: string, idx: number) {
    this.cancuService.deletecancu(uid).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listcancu.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
