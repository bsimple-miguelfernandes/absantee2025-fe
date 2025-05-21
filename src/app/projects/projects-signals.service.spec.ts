import { TestBed } from '@angular/core/testing';

import { ProjectsSignalsService } from './projects-signals.service';

describe('ProjectsSignalsService', () => {
  let service: ProjectsSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
