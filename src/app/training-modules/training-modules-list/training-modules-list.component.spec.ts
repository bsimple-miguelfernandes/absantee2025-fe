import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingModulesListComponent } from './training-modules-list.component';
import { TrainingModule } from '../training-module';
import { TrainingSubject } from '../../training-subjects/training-subject';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { signal, WritableSignal } from '@angular/core';

describe('TrainingModulesListComponent', () => {
  let component: TrainingModulesListComponent;
  let fixture: ComponentFixture<TrainingModulesListComponent>;
  let router: Router;
  let signalsService: jasmine.SpyObj<TrainingModuleSignalService>;

  const mockModules: TrainingModule[] = [
    {
      id: 'tm1',
      trainingSubjectId: 'sub1',
      periods: [
        {
          _initDate: new Date('2023-01-01'),
          _finalDate: new Date('2023-12-31')
        }
      ]
    },
    {
      id: 'tm2',
      trainingSubjectId: 'sub2',
      periods: [
        {
          _initDate: new Date('2024-01-01'),
          _finalDate: new Date('2024-12-31')
        }
      ]
    }
  ];

  const mockSubjects: TrainingSubject[] = [
    { id: 'sub1', subject: 'Math', description:'jsjs' },
    { id: 'sub2', subject: 'Science', description:'jsjs' }
  ];

  beforeEach(async () => {
    signalsService = jasmine.createSpyObj('TrainingModuleSignalService', ['addTrainingModule']);

    await TestBed.configureTestingModule({
      imports: [TrainingModulesListComponent],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map().set('trainingModuleId', 'tm1')),
            snapshot: {}
          }
        },
        { provide: TrainingModuleSignalService, useValue: signalsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingModulesListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Configurar signals para trainingModules e trainingSubjects
    const trainingModulesSignal: WritableSignal<TrainingModule[]> = signal(mockModules);
    const trainingSubjectsSignal: WritableSignal<TrainingSubject[]> = signal(mockSubjects);

    // Atribuir os signals ao componente (contornando tipos)
    component.trainingModules = trainingModulesSignal as unknown as any;
    component.trainingSubjects = trainingSubjectsSignal as unknown as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filteredModules on init', () => {
    expect(component.filteredModules.length).toBe(2);
  });

  it('should update selectedTrainingModule from route params', () => {
    expect(component.selectedTrainingModule).toBe('tm1');
  });

  it('should call router.navigate on showDetails', () => {
    component.showDetails('tm1');
    expect(router.navigate).toHaveBeenCalledWith(['tm1'], { relativeTo: jasmine.anything() });
  });

  it('should navigate with selectRoute() and update selectedTrainingModule', () => {
    component.selectRoute('somePath', 'tm2');
    expect(router.navigate).toHaveBeenCalledWith(['somePath', 'tm2'], { relativeTo: jasmine.anything() });
    expect(component.selectedTrainingModule).toBe('tm2');
  });

  it('should trigger signal service on addTrainingModule()', () => {
    component.addTrainingModule();
    expect(signalsService.addTrainingModule).toHaveBeenCalled();
  });

  it('should filter modules by init and final date', () => {
    component.applyFilters({
      initDate: '2024-01-01',
      finalDate: '2024-12-31'
    });

    expect(component.filteredModules.length).toBe(1);
    expect(component.filteredModules[0].id).toBe('tm2');
  });

  it('should show all if filters are empty', () => {
    component.applyFilters({});
    expect(component.filteredModules.length).toBe(2);
  });

  it('should return correct subject name with getSubjectById()', () => {
    expect(component.getSubjectById('sub1')).toBe('Math');
    expect(component.getSubjectById('sub2')).toBe('Science');
    expect(component.getSubjectById('unknown')).toBe('Unknown');
  });

  it('should render a table with subjects instead of subject ids', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);

    expect(rows[0].textContent).toContain('Math');
    expect(rows[0].textContent).not.toContain('sub1');

    expect(rows[1].textContent).toContain('Science');
    expect(rows[1].textContent).not.toContain('sub2');
  });

  it('should emit filtersChanged when <app-filters> is interacted (simulated)', () => {
    const spy = spyOn(component, 'applyFilters');
    component.applyFilters({ initDate: '2024-01-01' });
    expect(spy).toHaveBeenCalledWith({ initDate: '2024-01-01' });
  });
});
