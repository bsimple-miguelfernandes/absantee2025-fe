import { TestBed } from '@angular/core/testing';

import { TaskForceDataService } from './task-force-data.service';

describe('TaskForceDataService', () => {
  let service: TaskForceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskForceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
