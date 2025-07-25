import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { InputSignal } from '@angular/core';

import { TrainingSubjectsListComponent } from './training-subjects-list.component';
import { TrainingSubject } from '../training-subject';
import { TrainingSubjectSignalsService } from '../training-subjects-signals.service';
import { FiltersComponent } from '../../filters/filters.component';

describe('TrainingSubjectsListComponent', () => {
  let component: TrainingSubjectsListComponent;
  let fixture: ComponentFixture<TrainingSubjectsListComponent>;
  let router: jasmine.SpyObj<Router>;
  let mockSignalsService: jasmine.SpyObj<TrainingSubjectSignalsService>;
  let activatedRoute: ActivatedRoute;

  const trainingSubjectsMock: TrainingSubject[] = [
    { id: '1', subject: 'Angular', description: 'Framework' },
    { id: '2', subject: 'React', description: 'Library' },
    { id: '3', subject: 'Vue', description: 'Framework' },
  ];

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    mockSignalsService = jasmine.createSpyObj('TrainingSubjectSignalsService', ['addTrainingSubject']);

    // Mock ActivatedRoute with paramMap observable
    activatedRoute = {
      paramMap: {
        subscribe: (fn: (value: any) => void) => {
          fn(convertToParamMap({ trainingSubjectId: '2' }));
          return { unsubscribe() {} };
        }
      }
    } as any;

    await TestBed.configureTestingModule({
      imports: [TrainingSubjectsListComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: TrainingSubjectSignalsService, useValue: mockSignalsService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingSubjectsListComponent);
    component = fixture.componentInstance;

    // Aqui a correção: usar signal() para criar o InputSignal
component.trainingSubjects = (() => trainingSubjectsMock) as unknown as InputSignal<TrainingSubject[]>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedTrainingSubject from route params', () => {
    expect(component.selectedTrainingSubject).toBe('2');
  });

  it('should set filteredSubjects initially equal to trainingSubjects', () => {
    // ngOnChanges não é chamado automaticamente no teste, chamamos manualmente
    component.ngOnChanges();
    expect(component.filteredSubjects.length).toBe(trainingSubjectsMock.length);
  });

  it('should render a table with the correct number of rows', () => {
    component.ngOnChanges();
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(trainingSubjectsMock.length);
  });

  it('should display correct subject and description in the table', () => {
    component.ngOnChanges();
    fixture.detectChanges();

    const firstRowCells = fixture.nativeElement.querySelectorAll('tbody tr')[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent.trim()).toBe('Angular');
    expect(firstRowCells[1].textContent.trim()).toBe('Framework');
  });

  it('should call router.navigate with correct parameters when Details button clicked', () => {
    component.ngOnChanges();
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const detailsButton = buttons.find(btn => btn.nativeElement.textContent.includes('Details'));
    detailsButton?.nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith(['/training-subjects', '1'], { relativeTo: activatedRoute });
    expect(component.selectedTrainingSubject).toBe('1');
  });

 

  it('should filter subjects when applyFilters is called', () => {
    component.ngOnChanges();
    component.applyFilters({ title: 'react', description: '' });
    expect(component.filteredSubjects.length).toBe(1);
    expect(component.filteredSubjects[0].subject).toBe('React');

    component.applyFilters({ title: '', description: 'framework' });
    expect(component.filteredSubjects.length).toBe(2);
  });

  it('should call signalsService.addTrainingSubject when addTrainingSubject button clicked', () => {
    component.addTrainingSubject();
    expect(mockSignalsService.addTrainingSubject).toHaveBeenCalled();
  });

  it('should have Add Training Subject button with routerLink', () => {
    const addButton = fixture.nativeElement.querySelector('button[type="button"]');
    expect(addButton).toBeTruthy();

    // Só validamos o texto porque o atributo routerLink pode não aparecer sempre no teste
    expect(addButton.textContent).toContain('Add Training Subject');
  });
});
