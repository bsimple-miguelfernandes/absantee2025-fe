import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Project } from './project.model';
import { ProjectsSignalsService } from '../services/projects-signals.service';
import { signal, WritableSignal } from '@angular/core';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let project: Project;
  let mockProjectsSignalService: jasmine.SpyObj<ProjectsSignalsService>;
  let projectSelectedSignal: WritableSignal<Project | undefined>;
  beforeEach(async () => {
    projectSelectedSignal = signal<Project | undefined>(undefined);
    mockProjectsSignalService = jasmine.createSpyObj('ProjectsSignalsService', [], {
      projectSelected: projectSelectedSignal
    });
    await TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [
        { provide: ProjectsSignalsService, useValue: mockProjectsSignalService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;

    project = {
      id: '1',
      title: 'Test 1',
      acronym: 'T1',
      periodDate: {
        initDate: new Date(2020, 1, 1),
        finalDate: new Date(2021, 1, 1)
      }
    };
    projectSelectedSignal.set(project);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
