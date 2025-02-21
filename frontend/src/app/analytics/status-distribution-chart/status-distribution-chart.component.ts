import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
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
  columnData!: (string | number)[][];
  hasData: boolean = false;

  statusColorMap: { [key: string]: string } = {
      "Applied": "#87CEEB",
      "To Apply": "#FFB6C1",
      "Screening": "#A388EE",
      "Interview": "#FD9745",
      "Offer": "#FFDC58",
      "Accepted": "#A3E636",
      "Rejected": "#FF6B6B",
      "Ghosted": "#D3D3D3"
  };

  pieOptions = {
    title: "Application Status Overview",
    titleTextStyle: {
      fontSize: 16,
      fontWeight: 550,
      color: "black"
    },
    width: 1250,
    height: 500,
    backgroundColor: "#8DB1E6",
    colors: [] as string[],
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
  };

  columnOptions = {
    title: "Application Status Overview",
    titleTextStyle: {
      fontSize: 16,
      fontWeight: 550,
      color: "black"
    },
    width: 1250,
    height: 500,
    backgroundColor: "#8DB1E6",
    colors: [] as string[],
    legend: {
      position: 'none'
    },
    isStacked: true,
    hAxis: {
      title: 'Status',
      textStyle: {
        fontSize: 16,
        color: 'black',
      }
    },
  };

  chart!: {
    type: ChartType;
    data: (string | number)[][];
    columns: Column[];
    options: {};
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if((changes['data'] || changes['type']) && this.data.length > 0) {
      if(this.type == 'PieChart') {
        const colors = this.data.map(row => this.statusColorMap[row[0] as string]);
        this.pieOptions.colors = colors;

        this.chart = {
          type: this.type,
          data: this.data,
          columns: ['Status', 'Count'],
          options: this.pieOptions,
        };

      } else if (this.type == 'ColumnChart') {
        const statuses = this.data.map(row => row[0] as string);
        const columns: Column[] = ['Status', ...statuses];

        this.columnData = this.data.map((row, rowIndex) => {
          const rowData = new Array(statuses.length).fill(0);
          rowData[rowIndex] = row[1];

          return [row[0], ...rowData];
        });

        const colors = statuses.map(status => this.statusColorMap[status]);

        this.columnOptions.colors = colors;

        this.chart = {
          type: this.type,
          data: this.columnData,
          columns: columns,
          options: this.columnOptions,
        };

        console.log(columns)
      }
      
      this.hasData = true;
    } else {
      this.hasData = false;
    }
  }
}
