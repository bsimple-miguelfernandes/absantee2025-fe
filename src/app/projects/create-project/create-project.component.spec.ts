import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProjectCreateComponent } from "./create-project.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ProjectsSignalsService } from "../projects-signals.service";
import { ProjectsDataService } from "../projects-data.service";
import { Project } from "../project/project";
import { ProjectCreateRequest } from "./create-project";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe('ProjectCreateComponent', () => {
    let component: ProjectCreateComponent;
    let fixture: ComponentFixture<ProjectCreateComponent>;
    let mockProjectSignalService: jasmine.SpyObj<ProjectsSignalsService>;
    let mockProjectDataService: jasmine.SpyObj<ProjectsDataService>;

    beforeEach(async () => {
        mockProjectSignalService = jasmine.createSpyObj('ProjectsSignalsService', ['cancelCreateProject']);
        mockProjectDataService = jasmine.createSpyObj('ProjectsDataService', ['createProject']);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                { provide: ProjectsSignalsService, useValue: mockProjectSignalService },
                { provide: ProjectsDataService, useValue: mockProjectDataService }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProjectCreateComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should create form with default empty values', () => {
        //Arrange
        let date = new Date();
        const formValue = component.form.value;

        // Assert
        expect(component.form).toBeDefined();
        expect(formValue.title).toBe('');
        expect(formValue.acronym).toBe('');
        expect(formValue.periodDate?.initDate).toBe(date.toISOString().split('T')[0]);
        expect(formValue.periodDate?.finalDate).toBe(date.toISOString().split('T')[0]);
    });

    it('should mark as invalid if title is empty', () => {
        //Arrange
        let acronym = "TEST";
        let initDate = new Date("2025-10-01");
        let finalDate = new Date("2025-12-01");
        // Act
        component.form.patchValue({
            title: '',
            acronym: acronym,
            periodDate: {
                initDate: initDate.toISOString().split('T')[0],
                finalDate: finalDate.toISOString().split('T')[0],
            }
        })

        // Assert
        expect(component.form.valid).toBeFalse();
    });

    it('should mark as invalid if title has size smaller than 1', () => {

    });

    it('should mark as invalid if title has size bigger than 50', () => {

    });

    it('should mark as invalid if acronym is empty', () => {

    });

    it('should mark as invalid if acronym has lowercase letters', () => {

    });

    it('should mark as invalid if acronym has numbers', () => {

    });

    it('should mark as invalid if acronym has size bigger than 10', () => {

    });

    it("should mark as invalid if period's initial date is after final date is empty", () => {

    });

    it('should log the form value on submit if valid', () => {
        // Arrange
        let title = "Test";
        let acronym = "TEST";
        let initDate = "2025-10-01";
        let finalDate = "2025-12-01";

        component.form.patchValue({
            title: title,
            acronym: acronym,
            periodDate: {
                initDate: initDate,
                finalDate: finalDate
            }
        });

        let createProject: ProjectCreateRequest = {
            title: title,
            acronym: acronym,
            periodDate: {
                initDate: initDate,
                finalDate: finalDate
            }
        };

        mockProjectDataService.createProject.and.returnValue(of());

        // Act
        component.form.updateValueAndValidity();
        component.onSubmit();

        // Assert
        expect(mockProjectDataService.createProject).toHaveBeenCalledOnceWith(createProject);
    });

    it('should bind title input values to the form controls', () => {
        //Arrange
        const titleInput = fixture.debugElement.query(By.css('input[formControlName="title"]')).nativeElement;
        titleInput.value = 'Test';

        // Act
        titleInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Assert
        expect(component.form.get('title')?.value).toBe('Test');
    });
});