import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('donutChart') private donutChart;

  // Table data
  public displayedColumns: string[] = ['position', 'location', 'views', 'files', 'conversion', 'total'];
  public dataSource: Array<any> = [
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 },
  ];

  // Donut charts data
  private data = {
    datasets: [{
      data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      'Red',
      'Yellow',
      'Blue'
    ]
  };

  public ngOnInit(): void {
    this.populateChart();
  }

  private populateChart(): void {
    const donutChart1 = new Chart(this.donutChart, {
      type: 'doughnut',
      data: this.data,
      // options: options
    });
  }
}
