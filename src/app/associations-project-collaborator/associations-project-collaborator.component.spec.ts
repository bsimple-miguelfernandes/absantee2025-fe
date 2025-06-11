import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator.component';
import { ProjectsDataService } from '../projects/projects-data.service';
import { ProjectsSignalsService } from '../projects/projects-signals.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CollaboratorSignalService } from '../collaborators/collaborator-signal.service';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { of, throwError } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { Project } from '../projects/project/project.model';
import { Collaborator } from '../collaborators/collaborator.model';

describe('AssociationsProjectCollaboratorComponent', () => {
  let component: AssociationsProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsProjectCollaboratorComponent>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;
  let mockCollabDataService: jasmine.SpyObj<CollaboratorDataService>;

  let mockProjectsSignalService: jasmine.SpyObj<ProjectsSignalsService>;
  let selectedProjSignal: WritableSignal<Project | undefined>;
  let projCollabsSignal: WritableSignal<Project | undefined>;
  let mockCollabSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedCollabSignal: WritableSignal<Collaborator | undefined>;
  let collabProjsSignal: WritableSignal<Collaborator | undefined>;

  beforeEach(async () => {
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getAssociations', 'getProjectById']);
    mockCollabDataService = jasmine.createSpyObj('CollaboratorSignalService', ['getAssociations', 'getCollabById'])

    selectedProjSignal = signal<Project | undefined>(undefined);
    projCollabsSignal = signal<Project | undefined>(undefined);
    mockProjectsSignalService = jasmine.createSpyObj('ProjectsSignalService', ['selectProject'], {
      projectSelected: selectedProjSignal,
      projectCollaboratorSelected: projCollabsSignal
    });

    selectedCollabSignal = signal<Collaborator | undefined>(undefined);
    collabProjsSignal = signal<Collaborator | undefined>(undefined);
    mockCollabSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['selectCollaborator'], {
      selectedCollaborator: selectedCollabSignal,
      selectedCollaboratorProjects: collabProjsSignal
    });

    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent],
      providers: [
        { provide: ProjectsDataService, useValue: mockProjectsDataService },
        { provide: ProjectsSignalsService, useValue: mockProjectsSignalService },
        { provide: CollaboratorDataService, useValue: mockCollabDataService },
        { provide: CollaboratorSignalService, useValue: mockCollabSignalService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call any service methods if projectId and collaboratorId are undefined', fakeAsync(() => {
    // Assert
    // No method should be called
    expect(mockCollabSignalService.selectCollaborator).not.toHaveBeenCalled();
    expect(mockProjectsDataService.getAssociations).not.toHaveBeenCalled();
    expect(mockProjectsSignalService.selectProject).not.toHaveBeenCalled();
    expect(mockCollabDataService.getAssociations).not.toHaveBeenCalled();
  }));

  it('should reset selected project and fetch collaborator projects when passing a collaboratorId', fakeAsync(() => {
    // Arrange
    const collabId = "1";
    const mockAssociations: AssociationProjectCollaborators[] = [];

    mockCollabDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('collaboratorId', collabId);

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    expect(mockProjectsSignalService.selectProject).toHaveBeenCalledOnceWith(undefined);
    expect(mockCollabDataService.getAssociations).toHaveBeenCalledOnceWith(collabId);
  }));

  it('should reset selected collaborator and fetch project collaborators when passing a projectId', fakeAsync(() => {
    // Arrange
    const projectId = "1";
    const mockAssociations: AssociationProjectCollaborators[] = [];

    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('projectId', projectId);

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    expect(mockCollabSignalService.selectCollaborator).toHaveBeenCalledOnceWith(undefined);
    expect(mockProjectsDataService.getAssociations).toHaveBeenCalledOnceWith(projectId);
  }));

  it('should get collaborator by Id and select it successfully when passing existing Id', fakeAsync(() => {
    // Arrange
    const mockAssoc: AssociationProjectCollaborators = {
      id: '1',
      projectId: 'p1',
      projectAcronym: 'PRJ',
      collaboratorId: 'c1',
      collaboratorEmail: 'test@example.com',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };

    const mockCollab: Collaborator = {
      collabId: 'c1',
      userId: '1',
      names: 'name',
      surnames: 'surname',
      email: 'email@email.com',
      userPeriod: {
        _initDate: new Date(),
        _finalDate: new Date()
      },
      collaboratorPeriod: {
        _initDate: new Date(),
        _finalDate: new Date()
      }
    };

    mockCollabDataService.getCollabById.and.returnValue(of(mockCollab));

    // Act
    component.onSelectCollaboratorDetails(mockAssoc);
    tick();

    // Assert
    expect(mockCollabDataService.getCollabById).toHaveBeenCalledOnceWith('c1');
    expect(mockCollabSignalService.selectCollaborator).toHaveBeenCalledOnceWith(mockCollab);
  }));

  it("should console log the error when getCollabId can't return a collaborator", fakeAsync(() => {
    // Arrange
    const mockAssoc: AssociationProjectCollaborators = {
      id: '1',
      projectId: 'p1',
      projectAcronym: 'PRJ',
      collaboratorId: 'c1',
      collaboratorEmail: 'test@example.com',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };

    const mockError = new Error("Random error message!");
    spyOn(console, 'log');

    mockCollabDataService.getCollabById.and.returnValue(throwError(() => (mockError)));

    // Act
    component.onSelectCollaboratorDetails(mockAssoc);
    tick();

    // Assert
    expect(mockCollabDataService.getCollabById).toHaveBeenCalledOnceWith('c1');
    expect(console.log).toHaveBeenCalledOnceWith(mockError);
  }));

  it('should get collaborator by Id and select it successfully when passing existing Id', fakeAsync(() => {
    // Arrange
    const mockAssoc: AssociationProjectCollaborators = {
      id: '1',
      projectId: 'p1',
      projectAcronym: 'PRJ',
      collaboratorId: 'c1',
      collaboratorEmail: 'test@example.com',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };

    const mockProj: Project = {
      id: 'p1',
      title: 'title',
      acronym: 'TITLE',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };

    mockProjectsDataService.getProjectById.and.returnValue(of(mockProj));

    // Act
    component.onSelectProjectDetails(mockAssoc);
    tick();

    // Assert
    expect(mockProjectsDataService.getProjectById).toHaveBeenCalledOnceWith(mockAssoc.projectId);
    expect(mockProjectsSignalService.selectProject).toHaveBeenCalledOnceWith(mockProj);
  }));

  it('should display project title when projectId is set', fakeAsync(() => {
    // Arrange
    const projectId = "p1";
    const mockProj: Project = {
      id: projectId,
      title: 'title',
      acronym: 'TITLE',
      periodDate: {
        initDate: new Date(),
        finalDate: new Date()
      }
    };

    const mockAssociations: AssociationProjectCollaborators[] = [];
    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));

    projCollabsSignal.set(mockProj);
    fixture.componentRef.setInput('projectId', projectId);

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(mockProj.title);
  }));

  it('should display collaborator full name when collaboratorId is set', fakeAsync(() => {
    // Arrange
    const collabId = "c1";
    const mockCollab: Collaborator = {
      collabId: collabId,
      userId: '1',
      names: 'name',
      surnames: 'surname',
      email: 'email@email.com',
      userPeriod: {
        _initDate: new Date(),
        _finalDate: new Date()
      },
      collaboratorPeriod: {
        _initDate: new Date(),
        _finalDate: new Date()
      }
    };

    const mockAssociations: AssociationProjectCollaborators[] = [];
    mockCollabDataService.getAssociations.and.returnValue(of(mockAssociations));

    collabProjsSignal.set(mockCollab);
    fixture.componentRef.setInput('collaboratorId', mockCollab);

    // Act
    fixture.detectChanges();
    tick();

    // Assert
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(mockCollab.names + " " + mockCollab.surnames);
  }));

  it('should render email column and collaborator details button when projectId is set', fakeAsync(() => {
    // Arrange
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: 'p1',
        projectAcronym: 'PRJ',
        collaboratorId: 'c1',
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('projectId', 'p1');

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const tableHeaderCells = fixture.nativeElement.querySelectorAll('table tr th');
    expect(tableHeaderCells[0].textContent).toContain("Email");

    const emailCell = fixture.nativeElement.querySelector('td');
    expect(emailCell.textContent).toContain('test@example.com');

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Collaborator Details');
  }));

  it('should render acronym column and project details button when collaboratorId is set', fakeAsync(() => {
    // Arrange
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: 'p1',
        projectAcronym: 'PRJ',
        collaboratorId: 'c1',
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    mockCollabDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('collaboratorId', 'c1');

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const tableHeaderCells = fixture.nativeElement.querySelectorAll('table tr th');
    expect(tableHeaderCells[0].textContent).toContain("Acronym");

    const acronymCell = fixture.nativeElement.querySelector('td');
    expect(acronymCell.textContent).toContain('PRJ');

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Project Details');
  }));

  it('should show app-collaborator-details component when projectId and collaboratorSelected are set', fakeAsync(() => {
    // Arrange
    selectedCollabSignal.set({
      collabId: 'c1',
      userId: 'u1',
      names: 'Jane',
      surnames: 'Doe',
      email: 'jane@example.com',
      userPeriod: { _initDate: new Date(), _finalDate: new Date() },
      collaboratorPeriod: { _initDate: new Date(), _finalDate: new Date() }
    });

    const mockAssociations: AssociationProjectCollaborators[] = [];
    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));

    fixture.componentRef.setInput('projectId', 'p1');

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const detailComp = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(detailComp).toBeTruthy();
  }));

  it('should render a row for each association on table for project collaborators', fakeAsync(() => {
    // Arrange
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: 'p1',
        projectAcronym: 'PRJ',
        collaboratorId: 'c1',
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('projectId', 'p1');

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const tableRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('table tr');
    // First row is header
    const dataRows: HTMLElement[] = Array.from(tableRows).slice(1);

    expect(dataRows.length).toBe(mockAssociations.length);

    // check that the emails appear in the correct rows
    expect(dataRows[0].textContent).toContain('test@example.com');
  }));

  it('should render a row for each association on table for collaborator projects', fakeAsync(() => {
    // Arrange
    const initDate = '2023-01-01';
    const finalDate = '2023-12-31';
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: 'p1',
        projectAcronym: 'PRJ',
        collaboratorId: 'c1',
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date(initDate),
          finalDate: new Date(finalDate)
        }
      }
    ];

    mockCollabDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('collaboratorId', 'c1');

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const tableRows: HTMLElement[] = fixture.nativeElement.querySelectorAll('table tr');
    // First row is header
    const dataRows: HTMLElement[] = Array.from(tableRows).slice(1);

    expect(dataRows.length).toBe(mockAssociations.length);

    const assocCells = fixture.nativeElement.querySelectorAll('table tr td');
    expect(assocCells[0].textContent.trim()).toContain(mockAssociations[0].projectAcronym);
    expect(assocCells[1].textContent.trim()).toEqual(initDate);
    expect(assocCells[2].textContent.trim()).toEqual(finalDate);
  }));

  it('should render collaborator details component if projectId and selectedCollaborator signal are defined', fakeAsync(() => {
    // Arrange
    const projectId = 'p1';
    const collabId = 'c1';
    const mockCollab: Collaborator = {
      collabId: collabId,
      userId: '1',
      names: 'names',
      surnames: 'surnames',
      email: 'namesSurnames@email.com',
      userPeriod: {
        _initDate: new Date('2023-01-01'),
        _finalDate: new Date('2023-12-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2023-01-01'),
        _finalDate: new Date('2023-12-31')
      }
    };
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: projectId,
        projectAcronym: 'PRJ',
        collaboratorId: collabId,
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('projectId', projectId);

    selectedCollabSignal.set(mockCollab);

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const collabDetailsComponentElement = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collabDetailsComponentElement).not.toBe(undefined);
  }));

  it('should render project component if collaboratorId and selectedProject are defined', fakeAsync(() => {
    // Arrange
    const projectId = 'p1';
    const collabId = 'c1';
    const mockProject: Project = {
      id: projectId,
      title: 'title',
      acronym: 'PRJ',
      periodDate: {
        initDate: new Date('2023-01-01'),
        finalDate: new Date('2023-12-31')
      }
    };
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: projectId,
        projectAcronym: 'PRJ',
        collaboratorId: collabId,
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    mockCollabDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('collaboratorId', collabId);

    selectedProjSignal.set(mockProject);

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const projectComponentElement = fixture.nativeElement.querySelector('app-project');
    expect(projectComponentElement).not.toBe(undefined);
  }));

  it('should not render h1 elements if no input signal is defined', () => {
    // Assert 
    const h1Elements = fixture.nativeElement.querySelectorAll('h1');

    expect(h1Elements.length).toBe(0);
  });

  it('should not render collaborator details component if selectedCollaborator signal is undefined', fakeAsync(() => {
    // Arrange
    const projectId = 'p1';
    const collabId = 'c1';
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: projectId,
        projectAcronym: 'PRJ',
        collaboratorId: collabId,
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('projectId', projectId);

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const collabDetailsElem = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collabDetailsElem).toBeFalsy();
  }));

  it('should not render project component if selectedproject signal is undefined', fakeAsync(() => {
    // Arrange
    const projectId = 'p1';
    const collabId = 'c1';
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: projectId,
        projectAcronym: 'PRJ',
        collaboratorId: collabId,
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    mockCollabDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('collaboratorId', collabId);

    // Act
    tick();
    fixture.detectChanges();

    // Assert
    const projectDetailsElem = fixture.nativeElement.querySelector('app-project');
    expect(projectDetailsElem).toBeFalsy();
  }));

  it('should execute onSelectCollaboratorDetails method when clicking on collaborator details button', fakeAsync(() => {
    // Arrange
    const projectId = 'p1';
    const collabId = 'c1';
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: projectId,
        projectAcronym: 'PRJ',
        collaboratorId: collabId,
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    spyOn(component, 'onSelectCollaboratorDetails');

    mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('projectId', projectId);

    // Act
    tick();
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    // Assert
    expect(component.onSelectCollaboratorDetails).toHaveBeenCalledOnceWith(mockAssociations[0]);
  }));

  it('should execute onSelectProjectDetails method when clicking on Project details button', fakeAsync(() => {
    // Arrange
    const projectId = 'p1';
    const collabId = 'c1';
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: projectId,
        projectAcronym: 'PRJ',
        collaboratorId: collabId,
        collaboratorEmail: 'test@example.com',
        periodDate: {
          initDate: new Date('2023-01-01'),
          finalDate: new Date('2023-12-31')
        }
      }
    ];

    spyOn(component, 'onSelectProjectDetails');

    mockCollabDataService.getAssociations.and.returnValue(of(mockAssociations));
    fixture.componentRef.setInput('collaboratorId', collabId);

    // Act
    tick();
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    // Assert
    expect(component.onSelectProjectDetails).toHaveBeenCalledOnceWith(mockAssociations[0]);
  }));
});
