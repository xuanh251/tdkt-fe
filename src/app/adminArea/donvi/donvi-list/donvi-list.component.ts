import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DonviService } from 'src/app/_services/donvi.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-donvi-list',
  templateUrl: './donvi-list.component.html',
  styleUrls: ['./donvi-list.component.scss']
})
export class DonviListComponent implements OnInit, AfterViewInit {
  listdonvi: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;
  constructor(
    private donviService: DonviService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.loaddonvis();
  }
  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
      this.spinner.hide();
    }, 300);
  }
  loaddonvis() {
    this.donviService.getListDonVi().subscribe(
      (listdonvi: any[]) => {
        this.listdonvi = listdonvi;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
      }
    );
  }

  deletedonvi(uid: string, idx: number) {
    this.donviService.deleteDonVi(uid).subscribe(
      (message: string) => {
        this.alertify.success(message);
        this.listdonvi.splice(idx, 1);
      },
      err => {
        this.alertify.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    );
  }

}
