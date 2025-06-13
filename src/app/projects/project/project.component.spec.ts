import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsSignalsService } from '../projects-signals.service';
import { BehaviorSubject, of } from 'rxjs';
import { ProjectViewModel } from '../models/project-view-model.model';

describe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;

    let mockProjectsSignalService: jasmine.SpyObj<ProjectsSignalsService>;
    let routerSpy: jasmine.SpyObj<Router>;

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
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [ProjectComponent],
            providers: [
                { provide: ProjectsSignalsService, useValue: mockProjectsSignalService },
                { provide: ActivatedRoute, useValue: { data: of({ ProjectData: mockProject }) } },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.project).toEqual(mockProject);
    });

    // --------------- Controller tests ---------------

    it('should initialize project from route data - ngOnInit code block', () => {
        // Assert
        expect(component.project).toEqual(mockProject);
    });

    it('should ')

});
