import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CanboService } from 'src/app/_services/canbo.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-canbo-list',
  templateUrl: './canbo-list.component.html',
  styleUrls: ['./canbo-list.component.scss']
})
export class CanboListComponent implements OnInit, AfterViewInit {
  listcanbo: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor(
    private canBoService: CanboService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.loadListCanBo();
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
      console.log('aasds');
      this.spinner.hide();
    }, 2000);
  }
  loadListCanBo() {
    this.canBoService.getListCanBo().subscribe(
      (listcanbo: any[]) => {
        this.listcanbo = listcanbo;
        console.log(listcanbo);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }
  deleteCanBo(id: string, idx: number) {
    this.canBoService.deleteCanBo(id).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listcanbo.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
