import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsComponent } from './project-details.component';
import { ProjectService } from '../project.service';
import { CollaboratorService } from '../../collaborators/collaborator.service';
import { EMPTY, of } from 'rxjs';
import { AddAssociationProjectCollaborator, Project } from '../project/project';
import { Collaborator } from '../../collaborators/collaborator';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { AddCollaboratorProjectComponent } from '../add-collaborator-project/add-collaborator-project.component';

describe('ProjectDetailsComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let mockProjectService: jasmine.SpyObj<ProjectService>;
  let mockCollaboratorService: jasmine.SpyObj<CollaboratorService>;
  let project: Project;
  let projectCollaborators: Collaborator[];

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectService', ['getProject', 'getProjectCollaborators', 'addCollaboratorToProject']);
    mockCollaboratorService = jasmine.createSpyObj('CollaboratorService', ['getCollaboratorsIds']);

    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent],
      providers: [
        { provide: ProjectService, useValue: mockProjectService},
        { provide: CollaboratorService, useValue: mockCollaboratorService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('projectId', '1');

    project = {
      id: '1',
      title: 'Test 1',
      acronym: 'T1',
      periodDate: {
        initDate: new Date(2020,1,1),
        finalDate: new Date(2021,1,1)
      }
    };
    mockProjectService.getProject.and.returnValue(of(project));

    projectCollaborators = [
      {
        id: '1',
        userId: '1',
        periodDateTime: {
          _initDate: new Date(2020,1,1),
          _finalDate: new Date(2021,1,1)
        }
      },
      {
        id: '2',
        userId: '2',
        periodDateTime: {
          _initDate: new Date(2020,1,1),
          _finalDate: new Date(2021,1,1)
        }
      }
    ];
    mockProjectService.getProjectCollaborators.and.returnValue(of(projectCollaborators));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the project info', () => {
    const h1 : HTMLElement = fixture.nativeElement.querySelector('h1');
    const h2 : HTMLElement = fixture.nativeElement.querySelector('h2');
    const p : HTMLElement = fixture.nativeElement.querySelector('p');
    const lis : NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('li');

    const datePipe = new DatePipe('en-US'); // or your app's locale
    const initDate = datePipe.transform(project.periodDate.initDate, 'longDate');
    const finalDate = datePipe.transform(project.periodDate.finalDate, 'longDate');

    expect(h1.textContent).toBe(project.title);
    expect(h2.textContent).toBe(project.acronym);
    expect(p.textContent?.trim()).toBe(`${initDate} – ${finalDate}`);

    const listTexts = Array.from(lis).map(li => li.textContent);
    expect(listTexts).toEqual(projectCollaborators.map(p => p.id));
  });

  it('should display AddCollaboratorProjectComponent when Add Collaborator button is clicked', () => {
    const button : HTMLElement = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.addCollaborator).toBe(true);
    const formComponent = fixture.nativeElement.querySelector('app-add-collaborator-project');
    expect(formComponent).toBeTruthy();
  });

  it('should call addCollaboratorToProject when form emits submitForm', () => {
    component.addCollaborator = true;
    fixture.detectChanges();
  
    const childComponent = fixture.debugElement.query(By.directive(AddCollaboratorProjectComponent)).componentInstance;
  
    const spy = spyOn(component, 'addCollaboratorToProject');
    
    const addAssocResponse: AddAssociationProjectCollaborator = {
      collaboratorId: '3',
      periodDate: {
        initDate: project.periodDate.initDate.toISOString().split('T')[0],
        finalDate: project.periodDate.finalDate.toISOString().split('T')[0],
      }
    };
  
    childComponent.submitForm.emit(addAssocResponse);
  
    expect(spy).toHaveBeenCalledOnceWith(addAssocResponse);
  });

  it('should add collaborator and close form when addCollaboratorToProject is called', () => {
    const addAssocResponse: AddAssociationProjectCollaborator = {
      collaboratorId: '3',
      periodDate: {
        initDate: project.periodDate.initDate.toISOString().split('T')[0],
        finalDate: project.periodDate.finalDate.toISOString().split('T')[0],
      }
    };
  
    mockProjectService.addCollaboratorToProject.and.returnValue(of(EMPTY));
  
    //Initial state
    component.addCollaborator = true;
  
    component.addCollaboratorToProject(addAssocResponse);
    fixture.detectChanges();
  
    expect(component.projectCollaboratorsIds).toContain('3');
    expect(component.addCollaborator).toBeFalse();
  
    const formComponent = fixture.nativeElement.querySelector('app-add-collaborator-project');
    expect(formComponent).toBeNull();
  });

  it('should call closeForm when form emits closeForm', () => {
    component.addCollaborator = true;
    fixture.detectChanges();
  
    const childComponent = fixture.debugElement.query(By.directive(AddCollaboratorProjectComponent)).componentInstance;
  
    const spy = spyOn(component, 'closeForm');
    
    childComponent.closeForm.emit();
  
    expect(spy).toHaveBeenCalledOnceWith();
  });

  it('should close form when closeForm is called', () => {
    //Initial state
    component.addCollaborator = true;
  
    component.closeForm();
    fixture.detectChanges();
  
    const formComponent = fixture.nativeElement.querySelector('app-add-collaborator-project');
    expect(formComponent).toBeNull();
  });
});
