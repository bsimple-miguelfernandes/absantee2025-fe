import { TestBed } from '@angular/core/testing';

import { ProjectsSignalsService } from './projects-signals.service';
import { Project } from './project/project.model';

describe('ProjectsSignalsService', () => {
  let service: ProjectsSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set projectCollaboratorSelected and projectSelected when calling selectProject', () => {
    const mockProject: Project = {
      id: 'p1',
      title: 'ProjOne',
      acronym: 'PONE',
      periodDate: {
        initDate: new Date('2019-06-10'),
        finalDate: new Date('2025-11-31')
      }
    };

    service.selectProject(mockProject);

    expect(service.projectSelected()).toEqual(mockProject);
    expect(service.projectCollaboratorSelected()).toEqual(undefined);
  });

  it('should set projectSelected and projectCollaboratorSelected when calling selectProjectCollaborators', () => {
    const mockProject: Project = {
      id: 'p1',
      title: 'ProjOne',
      acronym: 'PONE',
      periodDate: {
        initDate: new Date('2019-06-10'),
        finalDate: new Date('2025-11-31')
      }
    };

    service.selectProjectCollaborators(mockProject);

    expect(service.projectSelected()).toEqual(undefined);
    expect(service.projectCollaboratorSelected()).toEqual(mockProject);
  });

});
