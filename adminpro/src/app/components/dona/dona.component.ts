import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrl: './dona.component.css',
})
export class DonaComponent {
  @Input('title') donatitle: string = '';
  @Input('labels') doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  @Input('data') data: any = [350, 450, 100];

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData={
      labels: this.doughnutChartLabels,
      datasets:[{ data: this.data}]
    }
    
  }
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
      { data: [50, 150, 120] },
      { data: [250, 130, 70] },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  public colors: any[] = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] },
  ];
  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }
}
