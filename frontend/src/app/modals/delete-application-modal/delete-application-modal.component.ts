import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-delete-application-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-application-modal.component.html',
  styleUrl: './delete-application-modal.component.scss',
})
export class DeleteApplicationModalComponent {
  @Input() applicationId!: string | null;
  @Output() close = new EventEmitter<void>();

  constructor(private applicationService: ApplicationService) {}

  onClose() {
    this.close.emit();
  }

  async onSubmit() {
    if(!this.applicationId) {
      return;
    }

    await this.applicationService.deleteApplication(this.applicationId);
    this.close.emit();
  }
}
