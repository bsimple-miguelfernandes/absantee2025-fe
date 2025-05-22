import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCollaboratorsComponent } from './project-collaborators.component';
import { ProjectsSignalsService } from '../projects-signals.service';
import { ProjectsDataService } from '../projects-data.service';
import { signal, Signal, WritableSignal } from '@angular/core';
import { Project } from '../project/project';
import { CollaboratorDetails } from '../../collaborators/collaborator-details/collaborator-details';

describe('ProjectCollaboratorsComponent', () => {
  let component: ProjectCollaboratorsComponent;
  let fixture: ComponentFixture<ProjectCollaboratorsComponent>;
  let projectSignalService: jasmine.SpyObj<ProjectsSignalsService>;
  let projectsDataService: jasmine.SpyObj<ProjectsDataService>;
  let projectCollaboratorsSelectedSignal: WritableSignal<Project | undefined>;
  let projectCollaborators: CollaboratorDetails[];
  let project: Project;

  beforeEach(async () => {
    projectCollaboratorsSelectedSignal = signal<Project | undefined>(undefined);
    projectSignalService = jasmine.createSpyObj('ProjectsSignalsService', [], {
      projectCollaboratorSelected: projectCollaboratorsSelectedSignal
    });
    projectsDataService = jasmine.createSpyObj<ProjectsDataService>('ProjectsDataService', ['getProjectCollaborators']);
    await TestBed.configureTestingModule({
      imports: [ProjectCollaboratorsComponent],
      providers: [
        { provide: ProjectsSignalsService, useValue: projectSignalService },
        { provide: ProjectsDataService, useValue: projectsDataService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectCollaboratorsComponent);
    component = fixture.componentInstance;

    project =
    {
      id: '1',
      title: "Project1",
      acronym: "P1",
      periodDate: {
        initDate: new Date("2021-02-01"),
        finalDate: new Date("2024-07-30")
      }
    };

    projectCollaborators = [
      {
        id: "1",
        names: "Alice",
        surnames: "Johnson",
        email: "alice.johnson@example.com",
        periodDateTime: {
          _initDate: new Date("2019-06-10"),
          _finalDate: new Date("2025-12-31")
        }
      },
      {
        id: "2",
        names: "Bob",
        surnames: "Martinez",
        email: "bob.martinez@example.com",
        periodDateTime: {
          _initDate: new Date("2021-02-01"),
          _finalDate: new Date("2024-07-30")
        }
      }
    ];
    projectsDataService.getProjectCollaborators.and.returnValue(projectCollaborators);

    projectCollaboratorsSelectedSignal.set(project);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
