import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { ProjectsSignalsService } from '../projects-signals.service';
import { ProjectsDataService } from '../projects-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProjectViewModel } from '../models/project-view-model.model';
import { signal, WritableSignal } from '@angular/core';
import { Location } from '@angular/common';

describe('ProjectFormComponent', () => {
    let component: ProjectFormComponent;
    let fixture: ComponentFixture<ProjectFormComponent>;

    let router: Router;
    let location: Location;

    let mockProjectDataService: jasmine.SpyObj<ProjectsDataService>;
    let mockProjectSignalService: jasmine.SpyObj<ProjectsSignalsService>;
    let projectCreatedSignal: WritableSignal<ProjectViewModel | undefined>;
    let projectUpdatedSignal: WritableSignal<ProjectViewModel | undefined>;

    const mockProject: ProjectViewModel = {
        id: '1',
        title: 'Test Project',
        acronym: 'TP',
        periodDate: {
            initDate: new Date(),
            finalDate: new Date()
        }
    };

    beforeEach(async () => {
        mockProjectDataService = jasmine.createSpyObj('ProjectDataService', ['updateProject', 'createProject']);

        projectCreatedSignal = signal<ProjectViewModel | undefined>(undefined);
        projectUpdatedSignal = signal<ProjectViewModel | undefined>(undefined);

        mockProjectSignalService = jasmine.createSpyObj('ProjectsSignalsService', ['updateProject', 'saveProject'], {
            projectCreated: projectCreatedSignal,
            projectUpdated: projectUpdatedSignal
        });

        await TestBed.configureTestingModule({
            imports: [ProjectFormComponent],
            providers: [
                { provide: ProjectsDataService, useValue: mockProjectDataService },
                { provide: ProjectsSignalsService, useValue: mockProjectSignalService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: (key: string) => '1' // mock projectId
                            }
                        },
                        data: of({ ProjectData: mockProject })
                    }
                }
            ]
        })
            .compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigate');

        location = TestBed.inject(Location);
        spyOn(location, 'back');

        mockProjectDataService.createProject.and.returnValue(of(mockProject));
        mockProjectDataService.updateProject.and.returnValue(of(mockProject));

        fixture = TestBed.createComponent(ProjectFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // ---------------- Controller Tests ----------------

    it('should create form with initial values when editing', () => {
        // Assert
        expect(component.projectForm).toBeTruthy();
        expect(component.projectForm.value.title).toBe('Test Project');
        expect(component.projectForm.value.acronym).toBe('TP');
    });

    it('should create empty form and undefined projectToEdit variable when creating', async () => {
        // Arrange
        // Override ActivatedRoute provider for this test
        const route = TestBed.inject(ActivatedRoute) as any;
        route.data = of({ ProjectData: undefined });

        // Act
        // Recreate the component so it uses the new route data
        fixture = TestBed.createComponent(ProjectFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // Assert
        expect(component.projectToEdit).toBeUndefined();
        expect(component.projectForm.value.title).toBe('');
        expect(component.projectForm.value.acronym).toBe('');
    });

    it('should call createProject on submit when not editing', () => {
        // Arrange
        const route = TestBed.inject(ActivatedRoute) as any;
        route.data = of({ ProjectData: undefined });

        fixture = TestBed.createComponent(ProjectFormComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        component.projectForm.setValue({
            title: 'New Project',
            acronym: 'NP',
            periodDate: {
                initDate: '2022-01-01',
                finalDate: '2023-01-01'
            }
        });

        // Act
        component.onSubmit();

        // Assert
        expect(mockProjectDataService.createProject).toHaveBeenCalled();
        expect(mockProjectSignalService.saveProject).toHaveBeenCalled();
    });

    it('should call updateProject on submit when editing', () => {
        // Act
        component.onSubmit();

        // Assert
        expect(mockProjectDataService.updateProject).toHaveBeenCalled();
        expect(mockProjectSignalService.updateProject).toHaveBeenCalled();
    });

    it('should navigate back on exit() if history exists', () => {
        // Arrange
        spyOnProperty(window, 'history').and.returnValue({ length: 2 } as any);

        // Act  
        component.exit();

        // Assert
        expect(location.back).toHaveBeenCalled();
    });

    it('should navigate to /projects if history length is 1', () => {
        // Arrange
        spyOnProperty(window, 'history').and.returnValue({ length: 1 } as any);

        // Act
        component.exit();

        // Assert
        expect(router.navigate).toHaveBeenCalledWith(['/projects']);
    });

    // ---------------- Template Tests ----------------

    it('should display "Edit Project" in header when editing', () => {
        const header = fixture.nativeElement.querySelector('h2');
        expect(header.textContent).toContain('Edit Project');
    });

    it('should display "Add Project" in header when not editing', () => {
        component.projectToEdit = undefined;
        fixture.detectChanges();

        const header = fixture.nativeElement.querySelector('h2');
        expect(header.textContent).toContain('Add Project');
    });

    it('should render all form input fields', () => {
        const compiled = fixture.nativeElement;

        expect(compiled.querySelector('input[formControlName="title"]')).toBeTruthy();
        expect(compiled.querySelector('input[formControlName="acronym"]')).toBeTruthy();
        expect(compiled.querySelector('input[formControlName="initDate"]')).toBeTruthy();
        expect(compiled.querySelector('input[formControlName="finalDate"]')).toBeTruthy();
    });

    it('should disable submit button when form is invalid or not dirty', () => {
        const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
        expect(submitButton.disabled).toBeTrue();
    });

    it('should enable submit button when form is valid and dirty', () => {
        component.projectForm.markAsDirty();
        component.projectForm.get('title')?.setValue('Test Title');
        component.projectForm.get('acronym')?.setValue('TT');
        component.projectForm.get('periodDate.initDate')?.setValue('2022-01-01');
        component.projectForm.get('periodDate.finalDate')?.setValue('2022-12-31');

        fixture.detectChanges();

        const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
        expect(submitButton.disabled).toBeFalse();
    });

    it('should render "Save" on submit button when editing', () => {
        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        expect(submitButton.textContent).toContain('Save');
    });

    it('should render "Add" on submit button when creating', () => {
        component.projectToEdit = undefined;
        fixture.detectChanges();

        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        expect(submitButton.textContent).toContain('Add');
    });

    it('should call exit() when Cancel button is clicked', () => {
        spyOn(component, 'exit');
        const cancelButton = fixture.nativeElement.querySelector('button[type="button"]');
        cancelButton.click();
        expect(component.exit).toHaveBeenCalled();
    });
});
