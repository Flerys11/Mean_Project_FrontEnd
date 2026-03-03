import { Component, Input, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { StatCommandeService } from "../../services/stat/stat.service";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-traffic-distribution-by-article',
  standalone: true,
  imports: [CommonModule,MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './traffic-distribution-by-article.component.html',
})
export class AppTrafficDistributionByArticleComponent implements OnInit, OnChanges {

  @Input() idArticle!: string;
  @Input() nomArticle: string = 'Article';

  @ViewChild('chart') chart!: ChartComponent;

  public trafficdistributionChart: any = {};

  chiffreAffaireJour = 0;
  totalCommandesJour = 0;
  dernierJour!: string;

  constructor(private statService: StatCommandeService) {}

  ngOnInit(): void {
    if (this.idArticle) {
      this.loadDernierJour();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idArticle'] && this.idArticle) {
      this.loadDernierJour();
    }
  }

  loadDernierJour() {
    this.statService.getStatsByArticle('jour', this.idArticle).subscribe({
      next: (res) => {
        const stats = res.data || [];
        if (!stats.length) return;

        const last = stats[stats.length - 1];

        this.dernierJour = last._id;
        this.chiffreAffaireJour = last.chiffreAffaire;
        this.totalCommandesJour = last.totalCommandes;

        this.initChart();
      },
      error: (err) => console.error(err)
    });
  }

  initChart() {
    this.trafficdistributionChart = {
      series: [
        this.totalCommandesJour,
        this.chiffreAffaireJour,
      ],
      labels: [
        'Commandes',
        'Chiffre d\'affaires',
      ],
      chart: {
        type: 'donut',
        height: 160,
        toolbar: { show: false },
      },
      colors: ['#0085db', '#fb977d'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
          },
        },
      },
      stroke: { show: false },
      dataLabels: { enabled: false },
      legend: { show: false },
      tooltip: { enabled: true },
    };
  }
}
