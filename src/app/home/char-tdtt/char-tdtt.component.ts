import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-tdtt',
  templateUrl: './char-tdtt.component.html',
  styleUrls: ['./char-tdtt.component.scss']
})
export class CharTdttComponent implements OnInit {

  public doughnutChartLabels = ['TTLĐ Tiên tiến', 'TTLĐ Xuất sắc', 'Khác'];
  public doughnutChartData = [20, 50, 10];
  public doughnutChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
