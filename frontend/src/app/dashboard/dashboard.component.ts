  import { DatePipe } from '@angular/common';
  import { Component, ViewChild } from '@angular/core';
  import { MatButtonModule } from '@angular/material/button';
  import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { CustomPaginatorService } from '../services/custom-paginator.service';

  @Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [DatePipe, MatTableModule, MatButtonModule, MatPaginatorModule, ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorService}]
  })
  export class DashboardComponent {
    displayedColumns = ['job-title', 'company', 'status', 'job-link', 'date', 'actions'];
    fullData = [
        {
          "job-title": "Software Engineer",
          "company": "Company A",
          "status": "Applied",
          "job-link": "https://www.company-a.com/job/software-engineer",
          "date": new Date("2024-12-10")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Data Analyst",
          "company": "Company C",
          "status": "Rejected",
          "job-link": "https://www.company-c.com/job/data-analyst",
          "date": new Date("2024-12-14")
        },
        {
          "job-title": "Software Engineer",
          "company": "Company A",
          "status": "Applied",
          "job-link": "https://www.company-a.com/job/software-engineer",
          "date": new Date("2024-12-10")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Data Analyst",
          "company": "Company C",
          "status": "Rejected",
          "job-link": "https://www.company-c.com/job/data-analyst",
          "date": new Date("2024-12-14")
        },
        {
          "job-title": "Software Engineer",
          "company": "Company A",
          "status": "Applied",
          "job-link": "https://www.company-a.com/job/software-engineer",
          "date": new Date("2024-12-10")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Data Analyst",
          "company": "Company C",
          "status": "Rejected",
          "job-link": "https://www.company-c.com/job/data-analyst",
          "date": new Date("2024-12-14")
        },
        {
          "job-title": "Software Engineer",
          "company": "Company A",
          "status": "Applied",
          "job-link": "https://www.company-a.com/job/software-engineer",
          "date": new Date("2024-12-10")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Data Analyst",
          "company": "Company C",
          "status": "Rejected",
          "job-link": "https://www.company-c.com/job/data-analyst",
          "date": new Date("2024-12-14")
        },
        {
          "job-title": "Software Engineer",
          "company": "Company A",
          "status": "Applied",
          "job-link": "https://www.company-a.com/job/software-engineer",
          "date": new Date("2024-12-10")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Data Analyst",
          "company": "Company C",
          "status": "Rejected",
          "job-link": "https://www.company-c.com/job/data-analyst",
          "date": new Date("2024-12-14")
        },{
          "job-title": "Software Engineer",
          "company": "Company A",
          "status": "Applied",
          "job-link": "https://www.company-a.com/job/software-engineer",
          "date": new Date("2024-12-10")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Data Analyst",
          "company": "Company C",
          "status": "Rejected",
          "job-link": "https://www.company-c.com/job/data-analyst",
          "date": new Date("2024-12-14")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
        {
          "job-title": "Project Manager",
          "company": "Company B",
          "status": "Interview",
          "job-link": "https://www.company-b.com/job/project-manager",
          "date": new Date("2024-12-12")
        },
      ]

      dataSource: any[] = [];
      totalApplications = this.fullData.length;
      pageSizeOptions = [10, 20, 50];
      pageSize = 10;
      currentPage = 0;
      
      @ViewChild(MatPaginator) paginator!: MatPaginator;

      ngOnInit(): void {
        this.updatePageData();
      }

      onPageChange(event: any): void {
        this.currentPage = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePageData();
      }

      updatePageData(): void {
        const startIndex = this.currentPage * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.dataSource = this.fullData.slice(startIndex, endIndex);
      }
  }
