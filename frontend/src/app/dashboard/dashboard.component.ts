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
import { AddNewApplicationModalComponent } from '../modals/add-new-application-modal/add-new-application-modal.component';
import { ApplicationService } from '../services/application.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Application } from '../models/application.model';
import { DeleteApplicationModalComponent } from "../modals/delete-application-modal/delete-application-modal.component";
import { EditApplicationModalComponent } from "../modals/edit-application-modal/edit-application-modal.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, MatTableModule, MatButtonModule, MatPaginatorModule, AddNewApplicationModalComponent, CommonModule, DeleteApplicationModalComponent, EditApplicationModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorService }],
})
export class DashboardComponent {
  userObject!: User | null;

  isAddNewApplicationModalOpen = false;
  isEditApplicationModalOpen = false;
  selectedApplication: Application | null = null;
  isDeleteApplicationModalOpen = false;
  selectedApplicationId: string | null = null;

  displayedColumns = [
    'job-title',
    'company',
    'location',
    'job-link',
    'status',
    'date',
    'actions',
  ];

  user_id!: string;

  fullData: Application[] = [];
  dataSource: any[] = [];
  totalApplications = this.fullData.length;
  pageSizeOptions = [10, 20, 50];
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private applicationService: ApplicationService) {}

  async ngOnInit(): Promise<void> {
    this.userObject = await this.userService.fetchUser();
    
    if(this.userObject) {
      this.fullData = await this.applicationService.getApplicationsOfUser(this.userObject.id);
    }

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
    this.isAddNewApplicationModalOpen = true;
  }

  async closeAddAplicationModal() {
    this.isAddNewApplicationModalOpen = false;

    if(this.userObject?.id) {
      this.fullData = this.fullData = await this.applicationService.getApplicationsOfUser(this.userObject.id);
      this.updatePageData();
    }
  }

  openDeleteApplicationModal(applicationId: string) {
    this.selectedApplicationId = applicationId;
    this.isDeleteApplicationModalOpen = true;
  }

  async closeDeleteApplicationModal() {
    this.isDeleteApplicationModalOpen = false;  
    this.selectedApplicationId = null;

    if(this.userObject?.id) {
      this.fullData = await this.applicationService.getApplicationsOfUser(this.userObject.id);
      this.updatePageData();
    }
  }

  openEditApplicationModal(application: Application) {
    this.selectedApplication = application;
    this.isEditApplicationModalOpen = true;
  }

  async closeEditApplicationModal() {
    this.isEditApplicationModalOpen = false;
    this.selectedApplicationId = null;

    if(this.userObject?.id) {
      this.fullData = await this.applicationService.getApplicationsOfUser(this.userObject.id);
      this.updatePageData();
    }
  }
}
