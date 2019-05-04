import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-kttt',
  templateUrl: './char-kttt.component.html',
  styleUrls: ['./char-kttt.component.scss']
})
export class CharKtttComponent implements OnInit {

  public doughnutChartLabels = ['Cấp tỉnh', 'Cấp trường', 'Cấp cơ sở', 'Khác'];
  public doughnutChartData = [120, 150, 10, 60];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
