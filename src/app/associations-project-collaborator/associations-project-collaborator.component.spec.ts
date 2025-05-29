import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator.component';
import { ProjectsDataService } from '../projects/projects-data.service';
import { ProjectsSignalsService } from '../projects/projects-signals.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CollaboratorSignalService } from '../collaborators/collaborator-signal.service';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { of, throwError } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { Project } from '../projects/project/project';
import { Collaborator } from '../collaborators/collaborator';

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
    // const mockAssociations: AssociationProjectCollaborators[] = [
    //   {
    //     collaboratorId: 'c1',
    //     projectId: 'p1',
    //     collaboratorEmail: 'test@example.com',
    //     projectAcronym: 'PRJ',
    //     periodDate: {
    //       initDate: new Date('2023-01-01'),
    //       finalDate: new Date('2023-12-31')
    //     }
    //   }
    // ];
    // mockProjectsDataService.getAssociations.and.returnValue(of(mockAssociations));

    // fixture.componentRef.setInput('projectId', 'p1');
    // fixture.detectChanges();
    // tick();
    // fixture.detectChanges(); // ensure rendering completes

    // const emailCell = fixture.nativeElement.querySelector('td');
    // expect(emailCell.textContent).toContain('test@example.com');

    // const button = fixture.nativeElement.querySelector('button');
    // expect(button.textContent).toContain('Collaborator Details');
  }));

  it('should show app-collaborator-details component when projectId and collaboratorSelected are set', fakeAsync(() => {
    // mockCollabSignalService.selectedCollaborator = signal({
    //   collabId: 'c1',
    //   userId: 'u1',
    //   names: 'Jane',
    //   surnames: 'Doe',
    //   email: 'jane@example.com',
    //   userPeriod: { _initDate: new Date(), _finalDate: new Date() },
    //   collaboratorPeriod: { _initDate: new Date(), _finalDate: new Date() }
    // });

    // fixture.componentRef.setInput('projectId', 'p1');
    // fixture.detectChanges();
    // tick();
    // fixture.detectChanges();

    // const detailComp = fixture.nativeElement.querySelector('app-collaborator-details');
    // expect(detailComp).toBeTruthy();
  }));

});
