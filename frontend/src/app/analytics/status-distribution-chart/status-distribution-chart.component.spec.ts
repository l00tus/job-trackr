import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDistributionChartComponent } from './status-distribution-chart.component';

describe('StatusDistributionChartComponent', () => {
  let component: StatusDistributionChartComponent;
  let fixture: ComponentFixture<StatusDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDistributionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
