import {Component} from '@angular/core';

export interface PeriodicElement {
  location: string;
  position: number;
  views: number;
  files: number;
  conversion: string;
  total: number;
}

const ELEMENT_DATA:Array<any> = [
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
  {position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325,conversion: '10%' ,total: 43.3425},
];

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})

export class StatisticsComponent {

  public doughnutChartType1: string = 'doughnut';
  public doughnutChartLabels1: string[] = ['PDF1', 'PDF2', 'PDF3'];
  public doughnutChartData1: number[] = [350, 450, 100];

  public doughnutChartType2: string = 'doughnut';
  public doughnutChartLabels2: string[] = ['PDF1', 'PDF2', 'PDF3'];
  public doughnutChartData2: number[] = [350, 450, 100];

  public doughnutChartType3: string = 'doughnut';
  public doughnutChartLabels3: string[] = ['PDF1', 'PDF2', 'PDF3'];
  public doughnutChartData3: number[] = [350, 450, 100];

  
  public barChartLabels: string[] = ['PDF1', 'PDF2', 'PDF3', 'PDF3', 'PDF3', 'PDF3', 'PDF3'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40],label:'something'},
  ];

  public categories: string[] = ['Category1','Category2','Category3'];

  public chartHovered(e: any): void {
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  displayedColumns: string[] = ['position', 'location', 'views', 'files','conversion','total'];
  dataSource = ELEMENT_DATA;
}
