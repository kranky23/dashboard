import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientResponseViewComponent } from './patient-response-view.component';

describe('PatientResponseViewComponent', () => {
  let component: PatientResponseViewComponent;
  let fixture: ComponentFixture<PatientResponseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientResponseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientResponseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
