import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClient } from '@angular/common/http';
import { Project } from './project/project';
import { of, throwError } from 'rxjs';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    // Inject the service after configuring the test module
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected projects (HttpClient called once)', (done: DoneFn) => {
    const expectedProjects: Project[] = [
      {
        id: "1",
        title: "Test 1",
        acronym: "T1",
        periodDate: {
          initDate: new Date(2020, 1, 1),
          finalDate: new Date(2021, 1, 1),
        },
      },
      {
        id: "2",
        title: "Test 2",
        acronym: "T2",
        periodDate: {
          initDate: new Date(2021, 1, 1),
          finalDate: new Date(2022, 1, 1),
        },
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedProjects));

    service.getProjects().subscribe({
      next: (projects) => {
        expect(projects).withContext('should match mocked projects').toEqual(expectedProjects);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count()).withContext('called once').toBe(1);
  });

  it('should return expected project with provided id (HttpClient called once)', (done: DoneFn) => {
    const expectedProject: Project = 
      {
        id: "1",
        title: "Test 1",
        acronym: "T1",
        periodDate: {
          initDate: new Date(2020, 1, 1),
          finalDate: new Date(2021, 1, 1),
        }
      };

    httpClientSpy.get.and.returnValue(of(expectedProject));

    service.getProject(expectedProject.id).subscribe({
      next: (project) => {
        expect(project).withContext('should match mocked project').toEqual(expectedProject);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count()).withContext('called once').toBe(1);
  });

  it('should handle project not found (404 error)', (done: DoneFn) => {
    const errorResponse = {
      status: 404,
      statusText: 'Project Not Found'
    };
  
    httpClientSpy.get.and.returnValue(throwError(() => errorResponse));
  
    service.getProject("999").subscribe({
      next: () => done.fail('expected an error, not project'),
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      }
    });
  });
});
