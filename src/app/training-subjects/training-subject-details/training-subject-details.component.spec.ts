import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingSubjectDetailsComponent } from './training-subject-details.component';
import { TrainingSubject } from '../training-subject';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrainingSubjectDetailsComponent', () => {
  let component: TrainingSubjectDetailsComponent;
  let fixture: ComponentFixture<TrainingSubjectDetailsComponent>;
  let router: Router;

  const mockTrainingSubject: TrainingSubject = {
    id: 'sub123',
    subject: 'Advanced AI',
    description: 'A detailed subject on Artificial Intelligence.'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TrainingSubjectDetailsComponent,
        HttpClientTestingModule  // Para evitar erro de HttpClient
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ trainingSubject: mockTrainingSubject })
          }
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingSubjectDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // ------------------- Component Logic -------------------

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize trainingSubject from route data', () => {
    expect(component.trainingSubject).toEqual(mockTrainingSubject);
  });

  it('should navigate to /training-subjects on close()', () => {
    component.close();
    expect(router.navigate).toHaveBeenCalledWith(['/training-subjects']);
  });

  // ------------------- HTML Template -------------------

  it('should render the title "Training Subject Details"', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Training Subject Details');
  });

  it('should render training subject subject and description', () => {
    const compiled = fixture.nativeElement;
    const detailRows = compiled.querySelectorAll('.detail-row');

    // 1º detail-row é o Subject Name
    expect(detailRows[0].textContent).toContain('Subject Name:');
    expect(detailRows[0].textContent).toContain(mockTrainingSubject.subject);

    // 2º detail-row é a Description
    expect(detailRows[1].textContent).toContain('Description:');
    expect(detailRows[1].textContent).toContain(mockTrainingSubject.description);
  });

  it('should have a "Close" button that triggers close()', () => {
  spyOn(component, 'close');
  const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLElement[];
  const closeBtn = buttons.find(btn => btn.textContent?.includes('Close'));
  expect(closeBtn).toBeTruthy();
  closeBtn!.click();
  expect(component.close).toHaveBeenCalled();
});

  it('should have an "Edit" button with correct routerLink', () => {
    const editBtn = fixture.nativeElement.querySelector('button:last-child');
    expect(editBtn.getAttribute('ng-reflect-router-link')).toBe(`/training-subjects,${mockTrainingSubject.id},edit`);
  });

});
