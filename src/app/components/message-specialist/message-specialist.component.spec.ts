import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSpecialistComponent } from './message-specialist.component';

describe('MessageSpecialistComponent', () => {
  let component: MessageSpecialistComponent;
  let fixture: ComponentFixture<MessageSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageSpecialistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
