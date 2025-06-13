import { TestBed } from '@angular/core/testing';
import { ProjectsDataService } from '../projects-data.service';
import { ProjectDetailsResolver } from './project-details.resolver';
import { ActivatedRouteSnapshot } from '@angular/router';
import { toProjectViewModel } from '../mappers/project.mapper';
import { Project } from '../models/project.model';
import { of } from 'rxjs';

describe('ProjectDetailsResolver', () => {
  let resolver: ProjectDetailsResolver;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;

  const mockProject: Project = {
    id: '1',
    title: 'Test Project',
    acronym: 'TP',
    periodDate: {
      initDate: new Date('2023-01-01'),
      finalDate: new Date('2023-12-31')
    }
  };

  beforeEach(() => {
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getProjectById']);

    TestBed.configureTestingModule({
      providers: [
        ProjectDetailsResolver,
        { provide: ProjectsDataService, useValue: mockProjectsDataService }
      ]
    });

    resolver = TestBed.inject(ProjectDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve a project and map it to ProjectViewModel', (done) => {
    const routeSnapshot = {
      paramMap: {
        get: (key: string) => key === 'projectId' ? '1' : null
      }
    } as unknown as ActivatedRouteSnapshot;

    const expected = toProjectViewModel(mockProject);

    mockProjectsDataService.getProjectById.and.returnValue(of(mockProject));

    resolver.resolve(routeSnapshot).subscribe(result => {
      expect(result).toEqual(expected);
      expect(mockProjectsDataService.getProjectById).toHaveBeenCalledWith('1');
      done();
    });
  });
});
