import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';
import { StatCommandeService, StatCommande } from "../../services/stat/stat.service";
import { CommonModule } from '@angular/common';
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
  selector: 'app-stat-total-by-article',
  standalone: true,
  imports: [CommonModule,MaterialModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './stat-total-by-article.component.html',
})
export class AppStatTotalByArticleComponent implements OnInit, OnChanges {

  @Input() idArticle!: string;
  @Input() nomArticle: string = 'Article';

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public profitExpanceChart: Partial<profitExpanceChart> = {};

  selectedType: 'jour' | 'mois' = 'jour';
  stats: StatCommande[] = [];

  constructor(private statService: StatCommandeService) {}

  ngOnInit(): void {
    if (this.idArticle) {
      this.loadStats(this.selectedType);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idArticle'] && this.idArticle) {
      this.loadStats(this.selectedType);
    }
  }

  loadStats(type: 'jour' | 'mois') {
    this.statService.getStatsByArticle(type, this.idArticle).subscribe({
      next: (res) => {
        this.stats = res.result;

        const labels = this.stats.map((s: any) => s.date);
        const data = this.stats.map((s: any) => s.totalCommandes);
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
