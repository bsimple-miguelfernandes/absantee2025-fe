import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { TrainingSubjectFormComponent } from './training-subject-form.component';
import { TrainingSubjectDataService } from '../training-subjects-data.service';
import { TrainingSubjectSignalsService } from '../training-subjects-signals.service';

describe('TrainingSubjectFormComponent', () => {
  let component: TrainingSubjectFormComponent;
  let fixture: ComponentFixture<TrainingSubjectFormComponent>;

  let router: Router;

  let mockDataService: jasmine.SpyObj<TrainingSubjectDataService>;
  let mockSignalService: jasmine.SpyObj<TrainingSubjectSignalsService>;

  const mockTrainingSubject = {
    id: '123',
    subject: 'Angular Basics',
    description: 'Learn the basics of Angular'
  };

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('TrainingSubjectDataService', ['addTrainingSubject', 'updateTrainingSubject']);
    mockSignalService = jasmine.createSpyObj('TrainingSubjectSignalsService', [
      'clearUpdatedSubject',
      'updateTrainingSubject',
      'saveTrainingSubject'
    ]);

    await TestBed.configureTestingModule({
      imports: [TrainingSubjectFormComponent], // componente com imports standalone
      providers: [
        { provide: TrainingSubjectDataService, useValue: mockDataService },
        { provide: TrainingSubjectSignalsService, useValue: mockSignalService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { trainingSubjectId: '123' },
              data: { trainingSubject: mockTrainingSubject }
            }
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(TrainingSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- Testes básicos ---

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Testes do ngOnInit ---

  it('should initialize form with data when editing', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.trainingSubjectForm.value.subject).toBe('Angular Basics');
    expect(component.trainingSubjectForm.value.description).toBe('Learn the basics of Angular');
  });

  it('should initialize empty form when adding', () => {
    // Simular ActivatedRoute para criação (sem dados)
    const activatedRoute = TestBed.inject(ActivatedRoute) as any;
    activatedRoute.snapshot.data.trainingSubject = undefined;
    activatedRoute.snapshot.params.trainingSubjectId = undefined;

    fixture = TestBed.createComponent(TrainingSubjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isEditMode).toBeFalse();
    expect(component.trainingSubjectForm.value.subject).toBe('');
    expect(component.trainingSubjectForm.value.description).toBe('');
  });

  // --- Testes do método cancel() ---

  it('should navigate to /training-subjects when cancel() is called', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/training-subjects']);
  });

  // --- Testes do método save() ---

  it('should not call service methods if form invalid', () => {
    component.trainingSubjectForm.controls['subject'].setValue('');
    component.trainingSubjectForm.controls['description'].setValue('');
    component.save();

    expect(mockDataService.addTrainingSubject).not.toHaveBeenCalled();
    expect(mockDataService.updateTrainingSubject).not.toHaveBeenCalled();
  });

  it('should call updateTrainingSubject when editing and form valid', () => {
    mockDataService.updateTrainingSubject.and.returnValue(of(mockTrainingSubject));

    component.save();

    expect(mockDataService.updateTrainingSubject).toHaveBeenCalledWith({
      id: '123',
      subject: 'Angular Basics',
      description: 'Learn the basics of Angular'
    });
    expect(mockSignalService.clearUpdatedSubject).toHaveBeenCalled();
    expect(mockSignalService.updateTrainingSubject).toHaveBeenCalledWith(mockTrainingSubject);
    expect(router.navigate).toHaveBeenCalledWith(['/training-subjects']);
  });

  it('should call addTrainingSubject when adding and form valid', () => {
  const newSubject = { subject: 'New Subject', description: 'New Description' };
  mockDataService.addTrainingSubject.and.returnValue(of({ id: '456', ...newSubject }));

  // Simular modo criação
  component.isEditMode = false;
  component.trainingSubjectForm.setValue(newSubject);

  component.save();

  // Correção aqui: verificar que foi chamado com um objeto que contém subject e description corretos
  expect(mockDataService.addTrainingSubject).toHaveBeenCalledWith(jasmine.objectContaining(newSubject));
  expect(mockSignalService.saveTrainingSubject).toHaveBeenCalledWith({ id: '456', ...newSubject });
  expect(router.navigate).toHaveBeenCalledWith(['/training-subjects']);
});

  // --- Testes do template ---

  it('should display correct header text when editing', () => {
    const header: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(header.textContent).toContain('Edit Training Subject');
  });

  it('should display correct header text when adding', () => {
    component.isEditMode = false;
    fixture.detectChanges();

    const header: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(header.textContent).toContain('Add Training Subject');
  });

  it('should render input fields with correct formControlName', () => {
    const subjectInput = fixture.nativeElement.querySelector('input[formControlName="subject"]');
    const descriptionInput = fixture.nativeElement.querySelector('input[formControlName="description"]');

    expect(subjectInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.trainingSubjectForm.controls['subject'].setValue('');
    component.trainingSubjectForm.controls['description'].setValue('');
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button when form is valid', () => {
    component.trainingSubjectForm.controls['subject'].setValue('Valid Subject');
    component.trainingSubjectForm.controls['description'].setValue('Valid Description');
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });

  it('should show "Save" on submit button when editing', () => {
    component.isEditMode = true;
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.textContent).toContain('Save');
  });

  it('should show "Add" on submit button when adding', () => {
    component.isEditMode = false;
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.textContent).toContain('Add');
  });

  it('should call cancel() when Cancel button clicked', () => {
    spyOn(component, 'cancel');
    const cancelButton = fixture.nativeElement.querySelector('button[type="button"]');
    cancelButton.click();

    expect(component.cancel).toHaveBeenCalled();
  });
});
