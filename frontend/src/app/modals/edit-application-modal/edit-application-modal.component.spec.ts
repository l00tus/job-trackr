import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplicationModalComponent } from './edit-application-modal.component';

describe('EditApplicationModalComponent', () => {
  let component: EditApplicationModalComponent;
  let fixture: ComponentFixture<EditApplicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditApplicationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
