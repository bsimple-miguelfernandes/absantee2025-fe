import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { of, throwError } from 'rxjs';
import { ProjectsDataService } from './projects-data.service';
import { signal, WritableSignal } from '@angular/core';
import { ProjectsSignalsService } from './projects-signals.service';
import { ProjectViewModel } from './models/project-view-model.model';
import { provideRouter, Router } from '@angular/router';
import { toProjectViewModel } from './mappers/project.mapper';
import { routes } from '../app.routes';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;
  let mockProjectSignalService: jasmine.SpyObj<ProjectsSignalsService>;

  let projectCreatedSignal: WritableSignal<ProjectViewModel | undefined>;
  let projectUpdatedSignal: WritableSignal<ProjectViewModel | undefined>;
  let projects: ProjectViewModel[] = [
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

  beforeEach(async () => {
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getProjects']);

    projectCreatedSignal = signal<ProjectViewModel | undefined>(undefined);
    projectUpdatedSignal = signal<ProjectViewModel | undefined>(undefined);

    mockProjectSignalService = jasmine.createSpyObj('ProjectsSignalsService', ['startCreateProject'], {
      projectCreated: projectCreatedSignal,
      projectUpdated: projectUpdatedSignal
    });

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        { provide: ProjectsDataService, useValue: mockProjectsDataService },
        { provide: ProjectsSignalsService, useValue: mockProjectSignalService },
        provideRouter(routes)
      ]
    })
      .compileComponents();

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

  it('should show create project button when route does not includes "create"', async () => {
    // Arrange
    const router = TestBed.inject(Router);

    // Act
    // Example without the create word
    await router.navigate(['/projects/']);
    fixture.detectChanges();

    // Assert
    const button = fixture.nativeElement.querySelector('[data-test-id="create-project-button"]');
    expect(button).not.toBeNull();
    expect(button.textContent).toContain('Create project');
  });

  it('should show project form component when route includes "create"', async () => {
    // Arrange
    const router = TestBed.inject(Router);

    // Act
    await router.navigate(['/projects/create']);
    fixture.detectChanges();

    // Assert
    const button = fixture.nativeElement.querySelector('[data-test-id="create-project-button"]');
    expect(button).toBeNull();
  });

  // ------------------- Controller -------------------

  it('should load and transform projects on init', () => {
    // Assert
    expect(mockProjectsDataService.getProjects).toHaveBeenCalled();
    const expectedVMs = projects.map(toProjectViewModel);
    expect(component.projects()).toEqual(expectedVMs);
    expect(component.filteredList).toEqual(expectedVMs);
  });

  it('should alert and log error when getProjects fails', () => {
    // Arrange
    spyOn(window, 'alert');
    const consoleSpy = spyOn(console, 'error');
    mockProjectsDataService.getProjects.and.returnValue(throwError(() => new Error('fail')));

    // Act
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Error loading projects');
    expect(consoleSpy).toHaveBeenCalledWith('Error loading projects', jasmine.any(Error));
  });

  it('should add project to filteredList when projectCreatedSignal emits', () => {
    // Arrange
    const newProject: ProjectViewModel = {
      id: '3',
      title: 'Gamma',
      acronym: 'GAM',
      periodDate: { initDate: new Date(), finalDate: new Date() }
    };

    // Act
    projectCreatedSignal.set(newProject);
    fixture.detectChanges();

    // Assert
    expect(component.filteredList.some(p => p.id === '3')).toBeTrue();
  });

  it('should update a project in filteredList when projectUpdatedSignal emits', () => {
    // Arrange
    const updatedProject = { ...projects[0], title: 'Alpha Updated' };

    // Act
    projectUpdatedSignal.set(updatedProject);
    fixture.detectChanges();

    // Assert
    const updated = component.filteredList.find(p => p.id === updatedProject.id);
    expect(updated?.title).toBe('Alpha Updated');
  });

  it('should return true from isCreatingProject() when route does not include "create"', async () => {
    // Arrange
    const router = TestBed.inject(Router);

    // Act
    // Exemple route
    await router.navigate(['/projects/']);
    fixture.detectChanges();

    // Assert
    expect(component.isCreatingProject()).toBeFalse();
  });

  it('should return false from isCreatingProject() when route includes "create"', async () => {
    // Arrange
    const router = TestBed.inject(Router);

    // Act
    await router.navigate(['/projects/create']);
    fixture.detectChanges();

    // Assert
    expect(component.isCreatingProject()).toBeTrue();
  });

  it('should update filteredList when onFilter is called', () => {
    const filtered: ProjectViewModel[] = [toProjectViewModel(projects[0])];
    component.onFilter(filtered);
    expect(component.filteredList).toEqual(filtered);
  });
});
