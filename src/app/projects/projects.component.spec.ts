import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { of } from 'rxjs';
import { ProjectsDataService } from './projects-data.service';
import { signal, WritableSignal } from '@angular/core';
import { ProjectsSignalsService } from './projects-signals.service';
import { ProjectViewModel } from './models/project-view-model.model';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;
  let mockProjectSignalService: jasmine.SpyObj<ProjectsSignalsService>;

  let isCreatingProjectFormSignal: WritableSignal<boolean>;
  let projectCreatedSignal: WritableSignal<ProjectViewModel | undefined>;
  let projectUpdatedSignal: WritableSignal<ProjectViewModel | undefined>;
  let projects: ProjectViewModel[];
  let filteredProjects: ProjectViewModel[];

  beforeEach(async () => {
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getProjects']);

    isCreatingProjectFormSignal = signal<boolean>(false);
    projectCreatedSignal = signal<ProjectViewModel | undefined>(undefined);
    projectUpdatedSignal = signal<ProjectViewModel | undefined>(undefined);

    mockProjectSignalService = jasmine.createSpyObj('ProjectsSignalsService', ['startCreateProject'], {
      isCreatingProjectForm: isCreatingProjectFormSignal,
      projectCreated: projectCreatedSignal,
      projectUpdated: projectUpdatedSignal
    });

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        { provide: ProjectsDataService, useValue: mockProjectsDataService },
        { provide: ProjectsSignalsService, useValue: mockProjectSignalService },
        provideRouter([])
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
    // Assert
    expect(component).toBeTruthy();
  });

  // ------------------------ Template tests ------------------------

  it('should show search component', () => {
    // Assert
    const searchComp = fixture.nativeElement.querySelector('app-search-projects');
    expect(searchComp).not.toBeNull();
  });

  it('should show projects table on init', () => {
    // Assert
    const projectsTable = fixture.nativeElement.querySelector('app-projects-table');
    expect(projectsTable).not.toBeNull();
  });

  it('should show create project button, if isCreatingProjectSignal is set to false', () => {
    // Act
    isCreatingProjectFormSignal.set(false);

    // Assert
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('[data-test-id="create-project-button"]');
    expect(button).toBeTruthy();
    expect(button.textContent!.trim()).toBe('Create project');
  });

  it('should show project form component, if isCreatingProjectSignal is set to true', () => {

  });

  // it('should not show project details on init because projectSelected is undefined', () => {
  //   const projectDetails = fixture.nativeElement.querySelector('app-project');
  //   expect(projectDetails).toBeNull();
  // });

  // it('should not show project associations on init because projectCollaboratorsSelected is undefined', () => {
  //   const associations = fixture.nativeElement.querySelector('app-associations-project-collaborator');
  //   expect(associations).toBeNull();
  // });

  // it('should show project details when projectSelected changes', () => {
  //   const project: ProjectViewModel = {
  //     id: '2',
  //     title: 'Test 2',
  //     acronym: 'T2',
  //     periodDate: {
  //       initDate: new Date(2020, 1, 1),
  //       finalDate: new Date(2021, 1, 1)
  //     }
  //   };


  //   fixture.detectChanges();
  //   const projectDetails = fixture.nativeElement.querySelector('app-project');
  //   expect(projectDetails).not.toBeNull();
  // });

  // it('should show project associations when projectCollaboratorsSelected changes', () => {
  //   const project: ProjectViewModel = {
  //     id: '2',
  //     title: 'Test 2',
  //     acronym: 'T2',
  //     periodDate: {
  //       initDate: new Date(2020, 1, 1),
  //       finalDate: new Date(2021, 1, 1)
  //     }
  //   };

  //   mockProjectsDataService.getAssociations.and.returnValue(of([]));

  //   fixture.detectChanges();
  //   const associations = fixture.nativeElement.querySelector('app-associations-project-collaborator');
  //   expect(associations).not.toBeNull();
  // });

  // it('should update projects list when projectCreatedSignal changes', () => {
  //   const project: ProjectViewModel = {
  //     id: '3',
  //     title: 'Test 3',
  //     acronym: 'T3',
  //     periodDate: {
  //       initDate: new Date(2020, 1, 1),
  //       finalDate: new Date(2021, 1, 1)
  //     }
  //   };

  //   projectCreatedSignal.set(project);

  //   fixture.detectChanges();

  //   const projectList = [...projects, project];

  //   expect(component.projects()).toEqual(projectList);
  // });
});
