import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewApplicationModalComponent } from './add-new-application-modal.component';

describe('AddNewApplicationModalComponent', () => {
  let component: AddNewApplicationModalComponent;
  let fixture: ComponentFixture<AddNewApplicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewApplicationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
