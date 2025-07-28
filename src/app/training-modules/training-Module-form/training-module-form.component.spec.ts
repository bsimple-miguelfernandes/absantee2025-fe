import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingModuleFormComponent } from './training-module-form.component';
import { TrainingModuleDataService } from '../training-modules-data.service';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TrainingModule } from '../training-module';
import { TrainingSubjectDataService } from '../../training-subjects/training-subjects-data.service';
import { TrainingSubject } from '../../training-subjects/training-subject';

describe('TrainingModuleFormComponent', () => {
  let component: TrainingModuleFormComponent;
  let fixture: ComponentFixture<TrainingModuleFormComponent>;

  let mockDataService: jasmine.SpyObj<TrainingModuleDataService>;
  let mockSignalService: jasmine.SpyObj<TrainingModuleSignalService>;
  let mockTrainingSubjectService: jasmine.SpyObj<TrainingSubjectDataService>;
  let router: Router;

  const mockTrainingModule: TrainingModule = {
    id: 'tm1',
    trainingSubjectId: 'sub1',
    periods: [
      {
        _initDate: new Date('2023-01-01'),
        _finalDate: new Date('2023-12-31')
      }
    ]
  };

  const mockSubjects: TrainingSubject[] = [
    { id: 'sub1', subject: 'Math' , description:'lol'},
    { id: 'sub2', subject: 'Science',description:'lol' }
  ];

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('TrainingModuleDataService', ['addTrainingModule', 'updateTrainingModule']);
    mockSignalService = jasmine.createSpyObj('TrainingModuleSignalService', ['saveTrainingModule', 'updateTrainingModule', 'clearUpdatedModule']);
    mockTrainingSubjectService = jasmine.createSpyObj('TrainingSubjectDataService', ['getTrainingSubjects']);

    await TestBed.configureTestingModule({
      imports: [TrainingModuleFormComponent],
      providers: [
        { provide: TrainingModuleDataService, useValue: mockDataService },
        { provide: TrainingModuleSignalService, useValue: mockSignalService },
        { provide: TrainingSubjectDataService, useValue: mockTrainingSubjectService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { trainingModuleID: 'tm1' },
              data: { trainingModule: mockTrainingModule }
            }
          }
        }
      ]
    }).compileComponents();

    mockTrainingSubjectService.getTrainingSubjects.and.returnValue(of(mockSubjects));
    fixture = TestBed.createComponent(TrainingModuleFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form in edit mode with correct values', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.trainingModuleForm.value.trainingSubjectId).toBe('sub1');
    expect(component.periods.length).toBe(1);
  });

  it('should add a new period on addPeriod()', () => {
    const initialLength = component.periods.length;
    component.addPeriod();
    expect(component.periods.length).toBe(initialLength + 1);
  });

  it('should remove a period on removePeriod()', () => {
    component.addPeriod(); // garantir pelo menos 2
    const initialLength = component.periods.length;
    component.removePeriod(0);
    expect(component.periods.length).toBe(initialLength - 1);
  });

  it('should navigate on cancel()', () => {
    spyOn(router, 'navigate');
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/training-modules']);
  });

  it('should call updateTrainingModule() and signal service on save() in edit mode', () => {
    mockDataService.updateTrainingModule.and.returnValue(of(mockTrainingModule));

    component.trainingModuleForm.setValue({
      trainingSubjectId: 'sub1',
      periods: [
        {
          _initDate: '2023-01-01',
          _finalDate: '2023-12-31'
        }
      ]
    });

    component.save();

    expect(mockDataService.updateTrainingModule).toHaveBeenCalled();
    expect(mockSignalService.clearUpdatedModule).toHaveBeenCalled();
    expect(mockSignalService.updateTrainingModule).toHaveBeenCalled();
  });

  it('should call addTrainingModule() and signal service on save() in create mode', () => {
    component.isEditMode = false;
    component.trainingModuleId = undefined;

    component.trainingModuleForm.setValue({
      trainingSubjectId: 'sub2',
      periods: [
        {
          _initDate: '2023-01-01',
          _finalDate: '2023-12-31'
        }
      ]
    });

    mockDataService.addTrainingModule.and.returnValue(of(mockTrainingModule));

    component.save();

    expect(mockDataService.addTrainingModule).toHaveBeenCalled();
    expect(mockSignalService.saveTrainingModule).toHaveBeenCalled();
  });

  // ---------- Template Tests ----------

  it('should show "Edit Training Module" title in edit mode', () => {
    const header = fixture.nativeElement.querySelector('h2');
    expect(header.textContent).toContain('Edit Training Module');
  });

  it('should show "Add Training Module" title in create mode', () => {
    component.isEditMode = false;
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h2');
    expect(header.textContent).toContain('Add Training Module');
  });

  it('should render a select with subject options', () => {
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('select[formControlName="trainingSubjectId"]');
    expect(select).toBeTruthy();
    expect(select.options.length).toBeGreaterThan(1);
  });

  it('should render date inputs for each period', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('input[type="date"]').length).toBeGreaterThan(1);
  });

  it('should disable submit button if form is invalid', () => {
    component.trainingModuleForm.get('trainingSubjectId')?.setValue('');
    fixture.detectChanges();
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable submit button if form is valid', () => {
    component.trainingModuleForm.setValue({
      trainingSubjectId: 'sub1',
      periods: [
        {
          _initDate: '2023-01-01',
          _finalDate: '2023-12-31'
        }
      ]
    });

    fixture.detectChanges();
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });
});
