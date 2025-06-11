import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { Project } from './project/project.model';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { ProjectsDataService } from './projects-data.service';
import { signal, WritableSignal } from '@angular/core';
import { ProjectsSignalsService } from './projects-signals.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;
  let projects: Project[];
  let mockProjectSignalService: jasmine.SpyObj<ProjectsSignalsService>;
  let projectSelectedSignal: WritableSignal<Project | undefined>;
  let projectCollaboratorsSelectedSignal: WritableSignal<Project | undefined>;
  let mockCollaboratorDataService: jasmine.SpyObj<CollaboratorDataService>;
  let isCreatingProjectFormSignal: WritableSignal<boolean>;
  let isEditingProjectFormSignal: WritableSignal<Project | undefined>;
  let projectCreatedSignal: WritableSignal<Project | undefined>;
  let projectUpdatedSignal: WritableSignal<Project | undefined>;

  beforeEach(async () => {
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getProjects', 'getAssociations']);

    projectSelectedSignal = signal<Project | undefined>(undefined);
    projectCollaboratorsSelectedSignal = signal<Project | undefined>(undefined);
    isCreatingProjectFormSignal = signal<boolean>(false);
    isEditingProjectFormSignal = signal<Project | undefined>(undefined);
    projectCreatedSignal = signal<Project | undefined>(undefined);
    projectUpdatedSignal = signal<Project | undefined>(undefined);
    mockProjectSignalService = jasmine.createSpyObj('ProjectsSignalsService', ['selectProject', 'selectProjectCollaborators', 'startCreateProject', 'cancelCreateProject'], {
      projectSelected: projectSelectedSignal,
      projectCollaboratorSelected: projectCollaboratorsSelectedSignal,
      isCreatingProjectForm: isCreatingProjectFormSignal,
      isEditingProjectForm: isEditingProjectFormSignal,
      projectCreated: projectCreatedSignal,
      projectUpdated: projectUpdatedSignal

    })

    mockCollaboratorDataService = jasmine.createSpyObj('CollaboratorDataService', ['getAssociations']);
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent,
        RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: ProjectsDataService, useValue: mockProjectsDataService },
        { provide: ProjectsSignalsService, useValue: mockProjectSignalService },
        { provide: CollaboratorDataService, useValue: mockCollaboratorDataService }
      ]
    })
      .compileComponents();

    projects = [
      {
        id: '1',
        title: 'Test 1',
        acronym: 'T1',
        periodDate: {
          initDate: new Date(2020, 1, 1),
          finalDate: new Date(2021, 1, 1)
        }
      },
      {
        id: '2',
        title: 'Test 2',
        acronym: 'T2',
        periodDate: {
          initDate: new Date(2020, 1, 1),
          finalDate: new Date(2021, 1, 1)
        }
      }
    ];
    mockProjectsDataService.getProjects.and.returnValue(of(projects));

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show projects table on init', () => {
    const projectsTable = fixture.nativeElement.querySelector('app-projects-table');
    expect(projectsTable).not.toBeNull();
  });

  it('should not show project details on init because projectSelected is undefined', () => {
    const projectDetails = fixture.nativeElement.querySelector('app-project');
    expect(projectDetails).toBeNull();
  });

  it('should not show project associations on init because projectCollaboratorsSelected is undefined', () => {
    const associations = fixture.nativeElement.querySelector('app-associations-project-collaborator');
    expect(associations).toBeNull();
  });

  it('should show project details when projectSelected changes', () => {
    const project: Project = {
      id: '2',
      title: 'Test 2',
      acronym: 'T2',
      periodDate: {
        initDate: new Date(2020, 1, 1),
        finalDate: new Date(2021, 1, 1)
      }
    };

    projectSelectedSignal.set(project);

    fixture.detectChanges();
    const projectDetails = fixture.nativeElement.querySelector('app-project');
    expect(projectDetails).not.toBeNull();
  });

  it('should show project associations when projectCollaboratorsSelected changes', () => {
    const project: Project = {
      id: '2',
      title: 'Test 2',
      acronym: 'T2',
      periodDate: {
        initDate: new Date(2020, 1, 1),
        finalDate: new Date(2021, 1, 1)
      }
    };

    projectCollaboratorsSelectedSignal.set(project);
    mockProjectsDataService.getAssociations.and.returnValue(of([]));

    fixture.detectChanges();
    const associations = fixture.nativeElement.querySelector('app-associations-project-collaborator');
    expect(associations).not.toBeNull();
  });

  it('should update projects list when projectCreatedSignal changes', () => {
    const project: Project = {
      id: '3',
      title: 'Test 3',
      acronym: 'T3',
      periodDate: {
        initDate: new Date(2020, 1, 1),
        finalDate: new Date(2021, 1, 1)
      }
    };

    projectCreatedSignal.set(project);

    fixture.detectChanges();

    const projectList = [...projects, project];

    expect(component.projects()).toEqual(projectList);
  });
});
