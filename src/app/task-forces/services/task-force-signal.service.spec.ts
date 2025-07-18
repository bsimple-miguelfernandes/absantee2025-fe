import { TestBed } from '@angular/core/testing';

import { TaskForceSignalService } from './task-force-signal.service';

describe('TaskForceSignalService', () => {
  let service: TaskForceSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskForceSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
