import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomPaginatorService } from '../services/custom-paginator.service';
import { AddNewApplicationModalComponent } from '../add-new-application-modal/add-new-application-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, MatTableModule, MatButtonModule, MatPaginatorModule, AddNewApplicationModalComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorService }],
})
export class DashboardComponent {
  isModalOpen = false;

  displayedColumns = [
    'job-title',
    'company',
    'location',
    'job-link',
    'status',
    'date',
    'actions',
  ];
  fullData = [];

  dataSource: any[] = [];
  totalApplications = this.fullData.length;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

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

  openAddAplicationModal() {
    this.isModalOpen = true;
  }

  closeAddAplicationModal() {
    this.isModalOpen = false;
  }
}
