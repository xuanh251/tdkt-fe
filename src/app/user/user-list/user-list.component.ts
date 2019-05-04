import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/ultisService/alertify.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  accounts: any[];
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;

  constructor(
    private accountService: AccountService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.loadAccounts();
  }

  ngAfterViewInit() {
    this.dataTable = $(this.table.nativeElement);
    setTimeout(() => {
      // tslint:disable-next-line:object-literal-key-quotes
      this.dataTable.DataTable({ language: environment.dataTableLanguage });
      this.spinner.hide();
    }, 300);
  }

  loadAccounts() {
    // this.accountService.getAccounts().subscribe(
    //   (accounts: any[]) => {
    //     this.accounts = accounts;
    //     this.spinner.hide();
    //   },
    //   error => {
    //     this.spinner.hide();
    //     this.alertify.error('Đã xảy ra lỗi khi kết nối server!');
    //   }
    // );
  }

  deleteAccount(uid: string, idx: number) {
    // this.accountService.deleteAccount(uid).subscribe(
    //   (message: string) => {
    //     this.alertify.success(message);
    //     this.accounts.splice(idx, 1);
    //   },
    //   err => {
    //     this.alertify.error('Đã xảy ra lỗi!');
    //     console.log(err);
    //   }
    // );
  }
  NewMessage() {
    // this.sharedData.changeMessage('le xuan hoang');
  }
}
