import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Project } from './project';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let project: Project;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent,
        RouterModule.forRoot(routes)
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;

    project = {
      id: '1',
      title: 'Test 1',
      acronym: 'T1',
      periodDate: {
        initDate: new Date(2020,1,1),
        finalDate: new Date(2021,1,1)
      }
    };
    fixture.componentRef.setInput('project', project);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
