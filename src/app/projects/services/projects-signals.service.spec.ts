import { TestBed } from '@angular/core/testing';

import { ProjectsSignalsService } from './projects-signals.service';
import { Project } from '../project/project.model';

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
