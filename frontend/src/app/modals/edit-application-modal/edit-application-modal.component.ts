import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-edit-application-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-application-modal.component.html',
  styleUrl: './edit-application-modal.component.scss'
})
export class EditApplicationModalComponent {
  @Input() application!: Application | null;
  @Output() close = new EventEmitter<void>();

  applicationForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
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
    
    ngOnInit() {
      this.applicationForm = this.fb.group({
        job_title: [this.application?.job_title, Validators.required],
        company: [this.application?.company, Validators.required],
        location: [this.application?.location, Validators.required],
        job_link: [this.application?.job_link],
        status: [this.application?.status, Validators.required],
        date: [this.application?.date],
      });
    }

    onClose() {
      this.close.emit();
    }
    
    onSubmit() {
      this.close.emit();
    }
}
