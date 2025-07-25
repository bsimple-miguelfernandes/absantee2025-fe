import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { CreateAssociationTrainingmoduleCollaboratorComponent } from "./create-association-trainingmodule-collaborator.component";
import { Router } from "@angular/router";
import { AssociationTrainingmoduleCollaboratorService } from "../services/association-trainingmodule-collaborator.service";
import { AssociationTrainingmoduleCollaboratorSignalService } from "../services/association-trainingmodule-collaborator-signal.service";
import { CollaboratorDataService } from "../../collaborators/collaborator-data.service";
import { TrainingModuleDataService } from "../../training-modules/training-modules-data.service";
import { Collaborator } from "../../collaborators/collaborator";
import { TrainingModule } from "../../training-modules/training-module";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { of, throwError } from "rxjs";
import { AssociationTrainingModuleCollaboratorCreateRequest } from "./models/add-association-trainingmodule-collaborator.model";
import { AssociationTrainingModuleCollaborators } from "../models/association-trainingmodule-collaborator.model";

describe('CreateAssociationTrainingmoduleCollaboratorComponent', () => {
  let component: CreateAssociationTrainingmoduleCollaboratorComponent;
  let fixture: ComponentFixture<CreateAssociationTrainingmoduleCollaboratorComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAssocTMCService: jasmine.SpyObj<AssociationTrainingmoduleCollaboratorService>;
  let mockAssocTMCSignalService: jasmine.SpyObj<AssociationTrainingmoduleCollaboratorSignalService>;
  let mockCollaboratorService: jasmine.SpyObj<CollaboratorDataService>;
  let mockTrainingModuleService: jasmine.SpyObj<TrainingModuleDataService>;

  const mockTrainingModules: TrainingModule[] = [
    { id: 'tm1', trainingSubjectId: 'Test Module', periods: [] }
  ];

  const mockCollaborators: Collaborator[] = [
    {
      collabId: 'collabId',
      userId: 'userId',
      names: 'name',
      surnames: 'surnames',
      email: 'email@email.com',
      collaboratorPeriod: { _initDate: new Date(), _finalDate: new Date() },
      userPeriod: { _initDate: new Date(), _finalDate: new Date() }
    }
  ]

  const createdAssoc: AssociationTrainingModuleCollaborators =
  {
    id: '123',
    trainingModuleId: "1",
    collaboratorId: "1",
    periodDate: {
      initDate: new Date(),
      finalDate: new Date()
    }
  };

  beforeEach(async () => {

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAssocTMCService = jasmine.createSpyObj('AssociationTrainingmoduleCollaboratorService', ['createAssociationTMC']);
    mockAssocTMCSignalService = jasmine.createSpyObj('AssociationTrainingmoduleCollaboratorSignalService', ['isCreatingAssociationTMC', 'createAssociationTMC', 'changeAssociationTMCCreationState']);
    mockCollaboratorService = jasmine.createSpyObj('CollaboratorDataService', ['getCollabs']);
    mockTrainingModuleService = jasmine.createSpyObj('TrainingModuleDataService', ['getTrainingModules']);

    mockAssocTMCSignalService.isCreatingAssociationTMC.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateAssociationTrainingmoduleCollaboratorComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: AssociationTrainingmoduleCollaboratorService, useValue: mockAssocTMCService },
        { provide: AssociationTrainingmoduleCollaboratorSignalService, useValue: mockAssocTMCSignalService },
        { provide: CollaboratorDataService, useValue: mockCollaboratorService },
        { provide: TrainingModuleDataService, useValue: mockTrainingModuleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAssociationTrainingmoduleCollaboratorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      jasmine.clock().install();
      jasmine.clock().mockDate(new Date('2024-07-24'));
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should initialize form with trainingModuleId if collaboratorId is provided', () => {
      // Arrange
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));

      // Act
      fixture.componentRef.setInput('collaboratorId', 'collab1');
      fixture.detectChanges();

      // Assert
      expect(component.form.contains('trainingModuleId')).toBeTrue();
      expect(component.form.contains('collaboratorId')).toBeFalse();
      expect(component.form.get('periodDate.initDate')?.value).toBe('2024-07-24');
      expect(component.form.get('periodDate.finalDate')?.value).toBe('2024-07-24');
    });
    it('should initialize form with collaboratorId if trainingModuleId is provided', () => {
      // Arrange
      mockCollaboratorService.getCollabs.and.returnValue(of(mockCollaborators));

      // Act
      fixture.componentRef.setInput('trainingModuleId', 'tm456');
      fixture.detectChanges();

      // Assert
      expect(component.form.contains('collaboratorId')).toBeTrue();
      expect(component.form.contains('trainingModuleId')).toBeFalse();
    });

    it('should load training modules if collaboratorId is present', () => {
      // Arrange
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));

      // Act
      fixture.componentRef.setInput('collaboratorId', 'collab123');
      fixture.detectChanges();

      // Assert
      expect(mockTrainingModuleService.getTrainingModules).toHaveBeenCalled();
      expect(component.trainingModules).toEqual(mockTrainingModules);
    });

    it('should load collaborators if trainingModuleId is present', () => {
      // Arrange
      mockCollaboratorService.getCollabs.and.returnValue(of(mockCollaborators));

      // Act
      fixture.componentRef.setInput('trainingModuleId', 'tm456');
      fixture.detectChanges();

      // Assert
      expect(mockCollaboratorService.getCollabs).toHaveBeenCalled();
      expect(component.collaborators).toEqual(mockCollaborators);
    });

    it('should handle error if getTrainingModules fails', () => {
      // Arrange
      spyOn(console, 'error');
      spyOn(window, 'alert');
      mockTrainingModuleService.getTrainingModules.and.returnValue(throwError(() => new Error('Error loading')));

      // Act
      fixture.componentRef.setInput('collaboratorId', 'collab1');
      fixture.detectChanges();

      // Assert
      expect(console.error).toHaveBeenCalledWith('Error fetching training modules:', jasmine.any(Error));
      expect(window.alert).toHaveBeenCalledWith("Coulnd't fetch Collaborator!");
    });

    it('should alert and log error if getTrainingModules fails', () => {
      // Arrange
      spyOn(console, 'error');
      spyOn(window, 'alert');
      mockTrainingModuleService.getTrainingModules.and.returnValue(throwError(() => new Error('Error loading')));

      // Act
      fixture.componentRef.setInput('collaboratorId', 'collab1');
      fixture.detectChanges();

      // Assert
      expect(console.error).toHaveBeenCalledWith('Error fetching training modules:', jasmine.any(Error));
      expect(window.alert).toHaveBeenCalledWith("Coulnd't fetch Collaborator!");
    });


    it('should mark form invalid if initDate is after finalDate', () => {
      //Arrange
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));

      // Act
      fixture.componentRef.setInput('collaboratorId', 'collab1');
      fixture.detectChanges();

      component.form.get('periodDate.initDate')?.setValue('2024-08-01');
      component.form.get('periodDate.finalDate')?.setValue('2024-07-01');
      fixture.detectChanges();

      // Assert
      expect(component.form.valid).toBeFalse();
      expect(component.form.errors).toEqual({ dateRangeInvalid: true });
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

    it('should submit correctly when collaboratorId is provided', () => {
      // Arrange
      mockAssocTMCService.createAssociationTMC.and.returnValue(of(createdAssoc));
      spyOn(window, 'alert');

      // Act
      fixture.componentRef.setInput('collaboratorId', 'collab123');
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));
      fixture.detectChanges();

      component.form.get('trainingModuleId')?.setValue('tm1');

      // Act
      component.onSubmit();

      // Assert
      expect(mockAssocTMCService.createAssociationTMC).toHaveBeenCalledWith({
        collaboratorId: 'collab123',
        trainingModuleId: 'tm1',
        periodDate: {
          initDate: new Date('2024-07-24'),
          finalDate: new Date('2024-07-24')
        }
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/collaborators/associations-trainingmodule/collab123']);
    });

    it('should submit correctly when trainingModuleId is provided', () => {
      // Arrange
      mockAssocTMCService.createAssociationTMC.and.returnValue(of(createdAssoc));
      spyOn(window, 'alert');

      fixture.componentRef.setInput('trainingModuleId', 'tm456');
      mockCollaboratorService.getCollabs.and.returnValue(of(mockCollaborators));
      fixture.detectChanges();

      component.form.get('collaboratorId')?.setValue('collabId');

      // Act
      component.onSubmit();

      // Assert
      expect(mockAssocTMCService.createAssociationTMC).toHaveBeenCalledWith({
        trainingModuleId: 'tm456',
        collaboratorId: 'collabId',
        periodDate: {
          initDate: new Date('2024-07-24'),
          finalDate: new Date('2024-07-24')
        }
      });
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/training-modules/associations-collaborator/tm456']);
    });

    it('should not submit if form is invalid', () => {
      // Arrange
      fixture.componentRef.setInput('collaboratorId', 'collab123');
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));
      fixture.detectChanges();

      component.form.get('trainingModuleId')?.setValue('');

      // Act
      component.onSubmit();

      // Assert
      expect(mockAssocTMCService.createAssociationTMC).not.toHaveBeenCalled();
    });

    it('should alert if both IDs are missing', () => {
      spyOn(window, 'alert');
      component.initForm(); // skip ngOnInit

      component.onSubmit();

      expect(window.alert).toHaveBeenCalledWith('An error has occurred!');
    });

    it('should alert and log error if service call fails', () => {
      // Arrange
      spyOn(window, 'alert');
      spyOn(console, 'error');
      mockAssocTMCService.createAssociationTMC.and.returnValue(throwError(() => new Error('Backend error')));

      fixture.componentRef.setInput('collaboratorId', 'collab123');
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));
      fixture.detectChanges();

      component.form.get('trainingModuleId')?.setValue('tm1');

      // Act
      component.onSubmit();

      // Assert
      expect(window.alert).toHaveBeenCalledWith('Error creating association!');
      expect(console.error).toHaveBeenCalledWith('Error creating association:', jasmine.any(Error));
    });
  });

  describe('html', () => {

    it('should display collaborator select when trainingModuleId is set', () => {
      // Arrange
      fixture.componentRef.setInput('trainingModuleId', 'tm123');
      mockCollaboratorService.getCollabs.and.returnValue(of(mockCollaborators));

      // Act
      fixture.detectChanges();

      // Assert
      const select = fixture.nativeElement.querySelector('select[formControlName="collaboratorId"]');
      expect(select).toBeTruthy();
      expect(select.options.length).toBeGreaterThan(1);
    });

    it('should display trainingModule select when collaboratorId is set', () => {
      // Arrange
      fixture.componentRef.setInput('collaboratorId', 'collab123');
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));

      // Act
      fixture.detectChanges();

      // Assert
      const select = fixture.nativeElement.querySelector('select[formControlName="trainingModuleId"]');
      expect(select).toBeTruthy();
      expect(select.options.length).toBeGreaterThan(1);
    });

    it('should show validation error when collaboratorId is required but not selected', () => {
      // Arrange
      fixture.componentRef.setInput('trainingModuleId', 'tm123');
      mockCollaboratorService.getCollabs.and.returnValue(of(mockCollaborators));
      fixture.detectChanges();

      // Act
      const control = component.form.get('collaboratorId');
      control?.markAsTouched();
      control?.setValue('');
      fixture.detectChanges();

      // Assert
      const errorMsg = fixture.nativeElement.querySelector('.error');
      expect(errorMsg?.textContent).toContain('Collaborator is required');
    });

    it('should disable submit button when form is invalid', () => {
      // Arrange
      fixture.componentRef.setInput('trainingModuleId', 'tm123');
      mockCollaboratorService.getCollabs.and.returnValue(of(mockCollaborators));
      fixture.detectChanges();

      // Act & Assert
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBeTrue();
    });

    it('should enable submit button when form is valid', () => {
      // Arrange
      fixture.componentRef.setInput('collaboratorId', 'collab123');
      mockTrainingModuleService.getTrainingModules.and.returnValue(of(mockTrainingModules));
      fixture.detectChanges();

      // Act
      component.form.get('trainingModuleId')?.setValue('tm1');
      fixture.detectChanges();

      // Assert
      const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(button.disabled).toBeFalse();
    });

    it('should call onCancel when Cancel button is clicked', () => {
      // Arrange
      spyOn(component, 'onCancel');
      fixture.detectChanges();

      // Act
      const cancelButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="button"]');
      cancelButton.click();

      // Assert
      expect(component.onCancel).toHaveBeenCalled();
    });
  });
});
