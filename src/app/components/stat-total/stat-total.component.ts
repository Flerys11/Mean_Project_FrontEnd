import { Component, ViewChild, OnInit } from '@angular/core';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';
import {StatCommande, StatCommandeService} from "../../services/stat/stat.service";

export interface profitExpanceChart {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  yaxis: any;
  xaxis: any;
  fill: any;
  tooltip: any;
  stroke: any;
  legend: any;
  grid: any;
  marker: any;
}

@Component({
  selector: 'app-stat-total',
  standalone: true,
  imports: [MaterialModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './stat-total.component.html',
})
export class AppProfitExpensesComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public profitExpanceChart!: Partial<profitExpanceChart> | any;

  selectedType: 'jour' | 'mois' = 'jour';
  stats: StatCommande[] = [];

  constructor(private statService: StatCommandeService) {}

  ngOnInit(): void {
    this.loadStats(this.selectedType);
    // this.initChart([], []);
  }

  loadStats(type: 'jour' | 'mois') {
    this.statService.getStats(type).subscribe({
      next: (res) => {
        this.stats = res.data || [];
        const labels = this.stats.map(s => s._id);
        const data = this.stats.map(s => s.totalCommandes);
        this.initChart(labels, data);
      },
      error: (err) => console.error(err)
    });
  }


  initChart(labels: string[], data: number[]) {
    this.profitExpanceChart = {
      series: [
        {
          name: 'Total Commandes',
          data: data,
          color: '#0085db',
        }
      ],
      chart: {
        type: 'bar',
        height: 390,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '30%', borderRadius: 4, endingShape: 'rounded' }
      },
      dataLabels: { enabled: false },
      xaxis: { type: 'category', categories: labels },
      yaxis: {},
      grid: { borderColor: 'rgba(0,0,0,0.1)', strokeDashArray: 3 },
      tooltip: { theme: 'light' },
      legend: { show: false },
      stroke: { show: true, width: 5, colors: ['transparent'] }
    };
  }

  changeType(type: 'jour' | 'mois') {
    this.selectedType = type;
    this.loadStats(type);
  }
}
