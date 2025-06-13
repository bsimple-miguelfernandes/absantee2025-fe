import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { ProjectsDataService } from './projects-data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Project } from './models/project.model';
import { AssociationProjectCollaboratorsDTO } from '../associations-project-collaborator/association-project-collaborator.model';
import { ProjectCreateRequest } from './models/create-project.model';
import { AssociationProjectCollaboratorCreateRequest } from '../associations-project-collaborator/add-collaborator-project/add-association';

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
    // Arrange
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

    // Act
    const req = httpMock.expectOne('http://localhost:5073/api/Project');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);

    // Assert
    expect(result).toEqual(mockProjects);
  }));

  it('should fetch project by id', (() => {
    // Arrange
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

    // Act
    const req = httpMock.expectOne('http://localhost:5073/api/Project/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);

    // Assert
    expect(result).toEqual(mockProject);
  }));

  it('should fetch associations for a project', () => {
    // Arrange
    const id = '1';
    const mockDTOs: AssociationProjectCollaboratorsDTO[] = [
      {
        id: '1',
        projectId: '1',
        projectAcronym: 'um',
        collaboratorId: '1',
        collaboratorEmail: 'um@email.com',
        periodDate: {
          initDate: new Date(),
          finalDate: new Date()
        }
      }
    ];

    service.getAssociations(id).subscribe(assocs => {
      expect(assocs).toEqual(mockDTOs);
    });

    // Act
    const req = httpMock.expectOne(`http://localhost:5073/api/Project/${id}/associations`);

    // Assert
    expect(req.request.method).toBe('GET');
    req.flush(mockDTOs);
  });

  it('should create a new project', () => {
    const newProject: ProjectCreateRequest = {
      title: 'New', acronym: 'N',
      periodDate: {
        initDate: new Date().toDateString(),
        finalDate: new Date().toDateString()
      }
    };
    const createdProject: Project = {
      title: 'um',
      acronym: 'UM',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };

    service.createProject(newProject).subscribe(result => {
      expect(result).toEqual(createdProject);
    });

    const req = httpMock.expectOne(`http://localhost:5073/api/Project`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProject);
    req.flush(createdProject);
  });

  it('should update a project', () => {
    const updatedProject: Project = { id: '2', title: 'Updated Project' } as Project;

    service.updateProject(updatedProject).subscribe(result => {
      expect(result).toEqual(updatedProject);
    });

    const req = httpMock.expectOne(`http://localhost:5073/api/Project`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProject);
    req.flush(updatedProject);
  });

  it('should create a collaborator association', () => {
    const id = 'project1';
    const newAssoc: AssociationProjectCollaboratorCreateRequest = {
      collaboratorId: '1',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };
    const response: AssociationProjectCollaboratorsDTO = {
      id: 'assoc1',
      projectId: id,
      projectAcronym: 'um',
      collaboratorId: 'collab1',
      collaboratorEmail: 'um@email.com',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };

    service.createAssociation(id, newAssoc).subscribe(result => {
      expect(result).toEqual(response);
    });

    const req = httpMock.expectOne(`http://localhost:5073/api/Project/${id}/collaborators`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAssoc);
    req.flush(response);
  });
});