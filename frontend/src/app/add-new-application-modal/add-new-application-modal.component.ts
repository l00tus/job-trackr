import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-add-new-application-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-new-application-modal.component.html',
  styleUrl: './add-new-application-modal.component.scss',
})
export class AddNewApplicationModalComponent {
  @Output() close = new EventEmitter<void>();

  applicationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private applicationService: ApplicationService
  ) {
    this.applicationForm = this.fb.group({
      job_title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      job_link: [''],
      status: ['', Validators.required],
      date: [''],
    });
  }

  onClose() {
    this.close.emit();
  }

  async onSubmit() {
    if(this.applicationForm.valid) {
      let applicationObject = this.applicationForm.value;

      await this.userService.fetchUser();

      const user_id = this.userService.getUserId();
      applicationObject.user_id = user_id;

      await this.applicationService.createApplication(applicationObject);

      this.close.emit();
    }
  }
}
