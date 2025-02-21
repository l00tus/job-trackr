import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatusDistributionChartComponent } from "./status-distribution-chart/status-distribution-chart.component";
import { ApplicationService } from '../services/application.service';
import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { Application } from '../models/application.model';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, StatusDistributionChartComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  userObject!: User | null;
  activeTab!: string;
  applicationCount!: number;

  statusChartType: ChartType = ChartType.PieChart;
  statusChartData: (string | number)[][] = [];

  constructor(private userService: UserService, private applicationService: ApplicationService) {}

  async ngOnInit() {
    this.userObject = await this.userService.fetchUser();

    await this.fetchStatusChartData();
    this.applicationCount = this.statusChartData.length;
  }
  
  setActiveTab(activeTab: string) {
    this.activeTab = activeTab;
  }

  setStatusChart(chartType: string) {
    if(chartType === 'pie') {
      this.statusChartType = ChartType.PieChart;
    } else if(chartType === 'column') {
      this.statusChartType = ChartType.ColumnChart;
    }
  }

  async fetchStatusChartData(): Promise<void> {
    try {
      if(!this.userObject?.id) {
        console.error('User ID is undefined');
        this.statusChartData = [];
        return;
      }

      const applications: Application[] = await this.applicationService.getApplicationsOfUser(this.userObject?.id);

      const statusMap = new Map<string, number>();

      applications.forEach(app => {
        statusMap.set(app.status, (statusMap.get(app.status) || 0) + 1);
      })

      this.statusChartData = Array.from(statusMap.entries());
    } catch (err) {
      console.error(err);
      this.statusChartData = [];
    }
  }
}
