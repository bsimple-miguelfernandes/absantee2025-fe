import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectsDataService } from './projects-data.service';
import { Project } from './project/project';

describe('ProjectsDataService', () => {
  let service: ProjectsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectsDataService,]
    });

    service  = TestBed.inject(ProjectsDataService); 
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch all projects', fakeAsync(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Project 1',
        acronym: 'P1',
        periodDate: {
          initDate : new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      }
    ];

    let result: Project[] = [];

    service.getProjects().subscribe(r => (result = r));

    const req = httpMock.expectOne('http://localhost:5073/api/Project');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);

    tick();
    expect(result).toEqual(mockProjects);
  }));

  it('should fetch project by id', fakeAsync(() => {
    const mockProject: Project = {id:'1', title:'Project 1', acronym: 'P1', periodDate: {
          initDate : new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }}

    let result!: Project;
    service.getProjectById('1').subscribe(p => (result = p));

    const req = httpMock.expectOne('http://localhost:5073/api/Project/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);

    tick();
    expect(result).toEqual(mockProject);
  })) 
});
