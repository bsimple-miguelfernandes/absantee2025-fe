import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFormComponent } from './project-form.component';
import { ProjectsSignalsService } from '../projects-signals.service';
import { ProjectsDataService } from '../projects-data.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProjectFormComponent', () => {
    let component: ProjectFormComponent;
    let fixture: ComponentFixture<ProjectFormComponent>;
    let mockProjectSignalService: jasmine.SpyObj<ProjectsSignalsService>;
    let mockProjectDataService: jasmine.SpyObj<ProjectsDataService>;
    beforeEach(async () => {

        mockProjectDataService = jasmine.createSpyObj('ProjectDataService', ['']);
        await TestBed.configureTestingModule({
            imports: [ProjectFormComponent],
            providers: [
                { provide: ProjectsDataService, useValue: mockProjectDataService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {},
                        params: of({}),
                        queryParams: of({}),
                        url: of([]),
                        data: of({})
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProjectFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
