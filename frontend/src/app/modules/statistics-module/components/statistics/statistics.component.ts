import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';


export interface DonutChartData {
  name: string;
  datasets: [{
    data: number[];
    backgroundColor: string[];
  }];
  labels: string[];
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements AfterViewInit {

 // @ViewChildren('accuracyChart somethingChart somethingelseChart') private donutCharts;
  @ViewChildren('accuracyChart') private donutCharts;
  @ViewChild('barChart') private barChart;

  // Table data
  public displayedColumns: string[] = ['position', 'location', 'views', 'files', 'conversion', 'total'];
  public dataSource: any[] = [
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

  public accuracyChartData: DonutChartData = {
    name: 'accuracyChartData',
    datasets: [{
      data: [122, 28, 33, 49, 53],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
    }], labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4']
  };

  public somethingChartData: DonutChartData = {
    name: 'somethingChartData',
    datasets: [{
      data: [22, 44, 3, 45, 5],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
    }], labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4']
  };

  public somethingelseChartData: DonutChartData = {
    name: 'somethingelseChartData',
    datasets: [{
      data: [1, 2, 33, 4, 55],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
    }], labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4']
  };

  public barChartData: DonutChartData = {
    name: 'barChartData',
    datasets: [{
      data: [66, 84, 83, 45, 95],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
    }], labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4']
  };

  private globalDataSource: DonutChartData[] = [
    this.accuracyChartData,
    this.somethingChartData, this.somethingelseChartData
  ];

  public ngAfterViewInit(): void {
    this.populateDonutCharts();
    this.populateChart(this.barChart, 'bar');
  }

  private populateChart(element, type) {
    const dataId = element.nativeElement.getAttribute('data-id');
    const chart = new Chart(element.nativeElement, {
      type: type,
      data: this.globalDataSource.find(x => x.name === dataId),
    });
  }

  private populateDonutCharts(): void {
    this.donutCharts.forEach(element => {
      this.populateChart(element, 'doughnut');
    });

  }
}
