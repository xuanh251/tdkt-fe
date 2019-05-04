import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-tdcn',
  templateUrl: './char-tdcn.component.html',
  styleUrls: ['./char-tdcn.component.scss']
})
export class CharTdcnComponent implements OnInit {
  public doughnutChartLabels = ['CSTĐ toàn quốc', 'CSTD cấp tỉnh', 'CSTD cơ sở', 'LĐ tiên tiến'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  constructor() { }
  ngOnInit() {
  }

}
