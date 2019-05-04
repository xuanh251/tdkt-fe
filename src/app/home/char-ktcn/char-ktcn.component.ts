import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-ktcn',
  templateUrl: './char-ktcn.component.html',
  styleUrls: ['./char-ktcn.component.scss']
})
export class CharKtcnComponent implements OnInit {
  public doughnutChartLabels = ['Cấp tỉnh', 'Cấp trường', 'Cấp cơ sở', 'Khác'];
  public doughnutChartData = [10, 50, 80, 60];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
