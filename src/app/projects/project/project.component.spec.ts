import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsSignalsService } from '../projects-signals.service';
import { ProjectViewModel } from '../models/project-view-model.model';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';

describe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;

    let router: Router;
    let mockProjectsSignalService: jasmine.SpyObj<ProjectsSignalsService>;

    const mockProject: ProjectViewModel = {
        id: '1',
        title: 'Test Project',
        acronym: 'TP',
        periodDate: {
            initDate: new Date(2020, 1, 1),
            finalDate: new Date(2021, 1, 1)
        }
    };

    beforeEach(async () => {
        mockProjectsSignalService = jasmine.createSpyObj('ProjectsSignalsService', ['startEditProject']);

        await TestBed.configureTestingModule({
            imports: [ProjectComponent],
            providers: [
                { provide: ProjectsSignalsService, useValue: mockProjectsSignalService },
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
        }).compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigate');

        fixture = TestBed.createComponent(ProjectComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        // Assert
        expect(component).toBeTruthy();
    });

    // --------------- Controller tests ---------------

    it('should initialize project from route data - ngOnInit code block', async () => {
        // Arrange
        await fixture.whenStable();

        // Act
        fixture.detectChanges();

        // Assert
        expect(component.project).toEqual(mockProject);
    });

    it('should navigate to correct url when calling editProject()', () => {
        // Act
        component.editProject(mockProject);
        // Assert
        expect(router.navigate).toHaveBeenCalledWith(['projects/edit', mockProject.id]);
    });

    // --------------- Template Tests ---------------

    it('should render project title, acronym in the template', () => {
        //Arrange
        const compiled = fixture.nativeElement as HTMLElement;

        // Assert
        expect(compiled.querySelector('h1')?.textContent).toContain(mockProject.title);
        expect(compiled.querySelector('h2')?.textContent).toContain(mockProject.acronym);
    });

    it('should render formatted project dates in the template', () => {
        // Arrange
        const datePipe = new DatePipe('en-US');

        const expectedInitDate = datePipe.transform(mockProject.periodDate.initDate, 'longDate');
        const expectedFinalDate = datePipe.transform(mockProject.periodDate.finalDate, 'longDate');

        // Act
        const compiled = fixture.nativeElement as HTMLElement;
        const datesText = compiled.querySelector('.dates')?.textContent;

        // Assert
        expect(datesText).toContain(expectedInitDate!);
        expect(datesText).toContain(expectedFinalDate!);
    });

    it('should show error message if project is not loaded', async () => {
        // Arrange
        const route = TestBed.inject(ActivatedRoute);
        (route as any).data = of({}); // no ProjectData

        // Act
        fixture = TestBed.createComponent(ProjectComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        // Assert
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain('Error loading project');
    });

    it('should call editProject() method when clicking button', () => {
        // Arrange
        const spy = spyOn(component, 'editProject');

        // Act
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();

        // Assert
        expect(spy).toHaveBeenCalledOnceWith(component.project);
    });
});
