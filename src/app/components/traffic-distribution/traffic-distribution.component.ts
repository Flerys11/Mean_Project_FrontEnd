import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import {StatCommandeService} from "../../services/stat/stat.service";
import {DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-traffic-distribution',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule, DecimalPipe],
  templateUrl: './traffic-distribution.component.html',
})
export class AppTrafficDistributionComponent implements OnInit {

  @ViewChild('chart') chart!: ChartComponent;

  public trafficdistributionChart: any;

  chiffreAffaireJour = 0;
  totalCommandesJour = 0;
  dernierJour!: string;

  constructor(private statService: StatCommandeService) {}

  ngOnInit(): void {
    this.loadDernierJour();
  }

  loadDernierJour() {
    this.statService.getStats('jour').subscribe({
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
        'Chiffre d’affaires',
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
