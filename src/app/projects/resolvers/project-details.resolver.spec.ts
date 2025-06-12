import { TestBed } from '@angular/core/testing';
import { ProjectsDataService } from '../projects-data.service';
import { ProjectDetailsResolver } from './project-details.resolver';

describe('ProjectDetailsResolver', () => {
  let resolver: ProjectDetailsResolver;
  let serviceSpy: jasmine.SpyObj<ProjectsDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CollaboratorDataService', ['getProjectById']);

    TestBed.configureTestingModule({
      providers: [
        ProjectDetailsResolver,
        { provide: ProjectsDataService, useValue: spy }
      ]
    });

    resolver = TestBed.inject(ProjectDetailsResolver);
    serviceSpy = TestBed.inject(ProjectsDataService) as jasmine.SpyObj<ProjectsDataService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
