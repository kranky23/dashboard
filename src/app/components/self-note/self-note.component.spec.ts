import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfNoteComponent } from './self-note.component';

describe('SelfNoteComponent', () => {
  let component: SelfNoteComponent;
  let fixture: ComponentFixture<SelfNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
