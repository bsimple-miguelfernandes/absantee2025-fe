import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCollaboratorProjectComponent } from './add-collaborator-project.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectsDataService } from '../../projects/projects-data.service';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';
import { ProjectsSignalsService } from '../../projects/projects-signals.service';
import { CollaboratorSignalService } from '../../collaborators/collaborator-signal.service';
import { of, throwError } from 'rxjs';
import { Project } from '../../projects/models/project.model';
import { Collaborator } from '../../collaborators/collaborator';
import { By } from '@angular/platform-browser';

describe('AddCollaboratorProjectComponent', () => {
  let component: AddCollaboratorProjectComponent;
  let fixture: ComponentFixture<AddCollaboratorProjectComponent>;
  let mockProjectsService: jasmine.SpyObj<ProjectsDataService>;
  let mockCollabService: jasmine.SpyObj<CollaboratorDataService>;
  let mockProjectSignal: jasmine.SpyObj<ProjectsSignalsService>;
  let mockCollabSignal: jasmine.SpyObj<CollaboratorSignalService>;

  const mockProjects: Project[] = [
    { id: 'p1', title: 'Project One', acronym: 'PRJ1', periodDate: { initDate: new Date(), finalDate: new Date() } }
  ];

  const mockCollaborators: Collaborator[] = [
    {
      collabId: 'c1',
      userId: 'u1',
      names: 'Jane',
      surnames: 'Doe',
      email: 'jane@example.com',
      userPeriod: { _initDate: new Date(), _finalDate: new Date() },
      collaboratorPeriod: { _initDate: new Date(), _finalDate: new Date() }
    }
  ];

  beforeEach(async () => {
    mockProjectsService = jasmine.createSpyObj('ProjectsDataService', ['getProjects', 'createAssociation']);
    mockCollabService = jasmine.createSpyObj('CollaboratorDataService', ['getCollabs']);
    mockProjectSignal = jasmine.createSpyObj('ProjectsSignalsService', ['createAssociation', 'cancelCreateAssociation']);
    mockCollabSignal = jasmine.createSpyObj('CollaboratorSignalService', ['cancelCreateAssociation']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AddCollaboratorProjectComponent],
      providers: [
        FormBuilder,
        { provide: ProjectsDataService, useValue: mockProjectsService },
        { provide: CollaboratorDataService, useValue: mockCollabService },
        { provide: ProjectsSignalsService, useValue: mockProjectSignal },
        { provide: CollaboratorSignalService, useValue: mockCollabSignal }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCollaboratorProjectComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit logic', () => {
    it('should load projects if collaboratorId is provided', () => {
      fixture.componentRef.setInput('collaboratorId', 'c1');
      mockProjectsService.getProjects.and.returnValue(of(mockProjects));

      fixture.detectChanges();

      expect(mockProjectsService.getProjects).toHaveBeenCalled();
      expect(component.projects.length).toBe(1);
      expect(component.form.contains('projectId')).toBeTrue();
    });

    it('should load collaborators if projectId is provided', () => {
      fixture.componentRef.setInput('projectId', 'p1');
      mockCollabService.getCollabs.and.returnValue(of(mockCollaborators));

      fixture.detectChanges();

      expect(mockCollabService.getCollabs).toHaveBeenCalled();
      expect(component.collaborators.length).toBe(1);
      expect(component.form.contains('collaboratorId')).toBeTrue();
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date('2024-07-24'));
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should emit event and call service when form is valid (collaboratorId context)', () => {
      fixture.componentRef.setInput('collaboratorId', 'c1');
      mockProjectsService.getProjects.and.returnValue(of(mockProjects));
      mockProjectsService.createAssociation.and.returnValue(of({
        id: 'a1',
        projectId: 'p1',
        projectTitle: 'Project One',
        projectAcronym: 'PRJ1',
        collaboratorId: 'c1',
        collaboratorName: 'Jane Doe',
        collaboratorEmail: 'jane@example.com',
        periodDate: {
          initDate: new Date('2024-07-24'),
          finalDate: new Date('2024-07-30')
        }
      }));
      fixture.detectChanges();
      component.form.get('projectId')?.setValue('p1');
      component.onSubmit();

      expect(mockProjectsService.createAssociation).toHaveBeenCalled();
      expect(mockProjectSignal.createAssociation).toHaveBeenCalled();
    });

    it('should emit event and call service when form is valid (projectId context)', () => {
      fixture.componentRef.setInput('projectId', 'p1');
      mockCollabService.getCollabs.and.returnValue(of(mockCollaborators));
      mockProjectsService.createAssociation.and.returnValue(of({
        id: 'a1',
        projectId: 'p1',
        projectTitle: 'Project One',
        projectAcronym: 'PRJ1',
        collaboratorId: 'c1',
        collaboratorName: 'Jane Doe',
        collaboratorEmail: 'jane@example.com',
        periodDate: {
          initDate: new Date('2024-07-24'),
          finalDate: new Date('2024-07-30')
        }
      }));
      fixture.detectChanges();
      component.form.get('collaboratorId')?.setValue('c1');
      component.onSubmit();

      expect(mockProjectsService.createAssociation).toHaveBeenCalled();
      expect(mockProjectSignal.createAssociation).toHaveBeenCalled();
    });

    it('should not submit if form is invalid', () => {
      fixture.componentRef.setInput('collaboratorId', 'c1');
      mockProjectsService.getProjects.and.returnValue(of(mockProjects));

      fixture.detectChanges();
      component.form.get('projectId')?.setValue('');
      component.onSubmit();

      expect(mockProjectsService.createAssociation).not.toHaveBeenCalled();
    });

    it('should handle service error', () => {
      spyOn(window, 'alert');
      spyOn(console, 'log');
      fixture.componentRef.setInput('collaboratorId', 'c1');
      mockProjectsService.getProjects.and.returnValue(of(mockProjects));
      mockProjectsService.createAssociation.and.returnValue(throwError(() => new Error('fail')));

      fixture.detectChanges();
      component.form.get('projectId')?.setValue('p1');
      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('Error creating association!');
      expect(console.log).toHaveBeenCalledWith('Error creating association:', jasmine.any(Error));
    });
  });

  describe('onCancel', () => {
    it('should reset and emit cancel (collaborator context)', () => {
      mockProjectsService.getProjects.and.returnValue(of(mockProjects));
      fixture.componentRef.setInput('collaboratorId', 'c1');
      fixture.detectChanges();

      spyOn(component.cancel, 'emit');
      component.onCancel();

      expect(mockCollabSignal.cancelCreateAssociation).toHaveBeenCalled();
      expect(component.cancel.emit).toHaveBeenCalled();
    });

    it('should reset and emit cancel (project context)', () => {
      mockCollabService.getCollabs.and.returnValue(of(mockCollaborators));
      fixture.componentRef.setInput('projectId', 'p1');
      fixture.detectChanges();

      spyOn(component.cancel, 'emit');
      component.onCancel();

      expect(mockProjectSignal.cancelCreateAssociation).toHaveBeenCalled();
      expect(component.cancel.emit).toHaveBeenCalled();
    });
  });

  describe('HTML', () => {
    it('should render project dropdown when collaboratorId is set', () => {
      fixture.componentRef.setInput('collaboratorId', 'c1');
      mockProjectsService.getProjects.and.returnValue(of(mockProjects));
      fixture.detectChanges();

      const select = fixture.nativeElement.querySelector('select[formControlName="projectId"]');
      expect(select).toBeTruthy();
    });

    it('should render collaborator dropdown when projectId is set', () => {
      fixture.componentRef.setInput('projectId', 'p1');
      mockCollabService.getCollabs.and.returnValue(of(mockCollaborators));
      fixture.detectChanges();

      const select = fixture.nativeElement.querySelector('select[formControlName="collaboratorId"]');
      expect(select).toBeTruthy();
    });

    it('should call onCancel when cancel button clicked', () => {
      spyOn(component, 'onCancel');
      fixture.detectChanges();

      const cancelButton = fixture.debugElement.query(By.css('button[type="button"]'));
      cancelButton.nativeElement.click();

      expect(component.onCancel).toHaveBeenCalled();
    });
  });
});
