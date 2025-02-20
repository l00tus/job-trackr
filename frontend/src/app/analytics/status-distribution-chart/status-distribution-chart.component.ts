import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartType, Column, GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-status-distribution-chart',
  standalone: true,
  imports: [GoogleChartsModule, CommonModule ],
  templateUrl: './status-distribution-chart.component.html',
  styleUrl: './status-distribution-chart.component.scss'
})
export class StatusDistributionChartComponent {
  @Input() type: ChartType = ChartType.PieChart;
  @Input() data!: (string | number)[][];
  hasData: boolean = false;

  options = {
    title: "Application Status Overview",
    titleTextStyle: {
      fontSize: 16,
      fontWeight: 550,
      color: "black"
    },
    width: 1250,
    height: 500,
    backgroundColor: "#8DB1E6",
    colors: ["#FD9745", "#FFDC58", "#FF6B6B", "#A3E636", "#A388EE", "#FFB6C1", "#87CEEB", "#D3D3D3"],
    pieSliceTextStyle: {
      color: "black",
    },
    pieSliceBorderColor: "black",
    legend: {
      textStyle: {
        fontSize: 16,
        fontWeight: 550,
        color: "black"
      }
    },
  }

  chart!: {
    type: ChartType;
    data: (string | number)[][];
    column: Column[];
    options: {};
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes['data'] && this.data.length > 1) {
      this.chart = {
        type: this.type,
        data: this.data.slice(1),
        column: ['Status', 'Count'],
        options: this.options,
      };
  
      this.hasData = this.chart.data.length > 0;
    } else {
      this.hasData = false;
    }
  }
}
