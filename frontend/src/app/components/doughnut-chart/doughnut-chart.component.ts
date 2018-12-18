import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() chartType: string ="";
  @Input() chartLabels: string[]=[];
  @Input() chartData: number[]=[];
  
  constructor() { }

  ngOnInit() {
  }

  public chartHovered(e: any): void {
  }

}
