import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingModuleDetailsComponent } from './training-module-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TrainingModule } from '../training-module';
import { formatDate } from '@angular/common';

describe('TrainingModuleDetailsComponent', () => {
  let component: TrainingModuleDetailsComponent;
  let fixture: ComponentFixture<TrainingModuleDetailsComponent>;
  let router: Router;

  const mockTrainingModule: TrainingModule = {
    id: 'tm-001',
    trainingSubjectId: 'sub-123',
    periods: [
      {
        _initDate: new Date('2023-01-01'),
        _finalDate: new Date('2023-12-31')
      },
      {
        _initDate: new Date('2024-01-01'),
        _finalDate: new Date('2024-06-30')
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingModuleDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ trainingModule: mockTrainingModule }),
            snapshot: {},
          }
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingModuleDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize trainingModule from route data', () => {
    expect(component.trainingModule).toEqual(mockTrainingModule);
  });

  it('should render training module ID and subject ID', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('h3')?.textContent;
    const subjectRow = compiled.querySelector('.detail-row .value')?.textContent;

    expect(title).toContain('Training Module Details - ID: tm-001');
    expect(subjectRow).toContain('sub-123');
  });

  it('should render all periods in list', () => {
    const compiled = fixture.nativeElement;
    const periodItems = compiled.querySelectorAll('ul li');

    expect(periodItems.length).toBe(2);
    expect(periodItems[0].textContent).toContain(formatDate(new Date('2023-01-01'), 'shortDate', 'en-US'));
    expect(periodItems[0].textContent).toContain(formatDate(new Date('2023-12-31'), 'shortDate', 'en-US'));
  });

  it('should not render periods section if no periods are present', () => {
    component.trainingModule = {
      id: 'tm-002',
      trainingSubjectId: 'sub-999',
      periods: []
    };

    fixture.detectChanges();

    const periodsSection = fixture.nativeElement.querySelector('.periods');
    expect(periodsSection).toBeNull();
  });

  it('should navigate back on close()', () => {
    const route = TestBed.inject(ActivatedRoute);
    component.close();
    expect(router.navigate).toHaveBeenCalledWith(['../'], { relativeTo: route });
  });

  it('should call close() when close button is clicked', () => {
    spyOn(component, 'close');
    const closeButton = fixture.nativeElement.querySelector('button');
    closeButton.click();
    expect(component.close).toHaveBeenCalled();
  });
});
