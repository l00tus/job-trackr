import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, MatTableModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  displayedColumns = ['job-title', 'company', 'status', 'job-link', 'date', 'actions'];
  dataSource = [
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
    ]
    
}
