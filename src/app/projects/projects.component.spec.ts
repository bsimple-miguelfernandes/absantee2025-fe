import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { ProjectService } from './project.service';
import { Project } from './project/project';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let projects: Project[];

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', ['getProjects']);

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, 
        RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: ProjectService, useValue: mockProjectService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;

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
    mockProjectService.getProjects.and.returnValue(of(projects));


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
