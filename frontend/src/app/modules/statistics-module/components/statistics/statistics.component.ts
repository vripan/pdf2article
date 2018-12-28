import { Component, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';

interface DonutChartData {
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
  @ViewChildren('donutChart') private donutCharts;
  @ViewChild('barChart') private barChart;

  public displayLegend: boolean = true;
  public noExistingData: boolean = false;

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
    { position: 1, location: 'file1.pdf', views: 1.0079, files: 4.4325, conversion: '10%', total: 43.3425 }
  ];

  // Donut charts data
  public accuracyChartData: DonutChartData = {
    name: 'accuracyChartData',
    datasets: [{
      data: [122, 28, 33, 49],
      backgroundColor: []
    }], labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4']
  };

  public somethingChartData: DonutChartData = {
    name: 'somethingChartData',
    datasets: [{
      data: [22, 44, 3, 45],
      backgroundColor: []
    }],
    labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4']
  };

  public somethingelseChartData: DonutChartData = {
    name: 'somethingelseChartData',
    datasets: [{
      data: [1, 2, 33, 44],
      backgroundColor: []
    }],
    labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4']
  };

  // Bar char data
  public barChartData: DonutChartData = {
    name: 'barChartData',
    datasets: [{
      data: [66, 84, 83, 95, 75, 55, 77, 71, 99],
      backgroundColor: []
    }],
    labels: ['PDF1', 'PDF2', 'PDF3', 'PDF4', 'PDF5', 'PDF6', 'PDF7', 'PDF8']
  };

  private globalDataSource: DonutChartData[] = [
    this.accuracyChartData,
    this.somethingChartData, this.somethingelseChartData, this.barChartData
  ];

  public ngAfterViewInit(): void {
    this.populateDonutCharts();
    this.populateChart(this.barChart, 'bar');
  }

  private getRandomColor() {
    const color = 'hsl(' + 360 * Math.random() + ',' +
      (25 + 70 * Math.random()) + '%,' +
      (85 + 10 * Math.random()) + '%)';
    return color;
  }

  private populateChart(element, type) {
    const dataId = element.nativeElement.getAttribute('data-id');
    const data = this.globalDataSource.find(x => x.name === dataId);
    data.labels.forEach(x => {
      let color = this.getRandomColor();
      if (type === 'bar') {
        color = 'lightblue';
        this.displayLegend = false;
      }

      data.datasets[0].backgroundColor.push(color);
    });

    const chart = new Chart(element.nativeElement, {
      type: type,
      data: data,
      options: {
        legend: {
          display: this.displayLegend,
          position: 'right',
        }
      }
    });
  }

  private populateDonutCharts(): void {
    this.donutCharts.forEach((element: any) => {
      this.populateChart(element, 'doughnut');
    });
  }
}
