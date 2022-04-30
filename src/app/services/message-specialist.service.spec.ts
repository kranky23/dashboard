import { TestBed } from '@angular/core/testing';

import { MessageSpecialistService } from './message-specialist.service';

describe('MessageSpecialistService', () => {
  let service: MessageSpecialistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageSpecialistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
