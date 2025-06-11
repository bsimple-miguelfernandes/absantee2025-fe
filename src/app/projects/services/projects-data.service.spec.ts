import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ProjectsDataService } from './projects-data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Project } from '../project/project.model';

describe('ProjectsDataService', () => {
  let service: ProjectsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsDataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProjectsDataService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => httpMock.verify());

  it('should fetch all projects', (() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Project 1',
        acronym: 'P1',
        periodDate: {
          initDate: new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      }
    ];

    let result: Project[] = [];

    service.getProjects().subscribe(r => (result = r));

    const req = httpMock.expectOne('http://localhost:5073/api/Project');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);

    expect(result).toEqual(mockProjects);
  }));

  it('should fetch project by id', (() => {
    const mockProject: Project = {
      id: '1',
      title: 'Project 1',
      acronym: 'P1',
      periodDate: {
        initDate: new Date('2024-01-01'),
        finalDate: new Date('2024-12-31')
      }
    };

    let result!: Project;
    service.getProjectById('1').subscribe(p => (result = p));

    const req = httpMock.expectOne('http://localhost:5073/api/Project/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);


    expect(result).toEqual(mockProject);
  }));


  // it('should fetch associations by id', (() => {
  //   const mockAssociations: AssociationProjectCollaborators[] = [
  //     {
  //       id: "1",
  //       projectId: "1",
  //       projectAcronym: "T1",
  //       collaboratorId: "1",
  //       collaboratorEmail: "test1@example.com",
  //       periodDate: {
  //         initDate : new Date('2024-01-01'),
  //         finalDate: new Date('2024-12-31')
  //       }
  //     }
  //   ];

  //   let result!: AssociationProjectCollaborators[];
  //   service.getAssociations('1').subscribe(p => (result = p));

  //   const req = httpMock.expectOne('http://localhost:5073/api/Project/1/associations');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockAssociations);

  //   
  //   expect(result).toEqual(mockAssociations);
  // }));
});