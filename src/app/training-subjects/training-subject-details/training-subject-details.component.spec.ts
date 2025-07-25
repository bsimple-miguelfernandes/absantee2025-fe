import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingSubjectDetailsComponent } from './training-subject-details.component';
import { TrainingSubject } from '../training-subject';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
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
        HttpClientTestingModule  // <-- importante para resolver No provider for HttpClient!
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
    const title = fixture.debugElement.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('Training Subject Details');
  });

  it('should render training subject ID, subject, and description', () => {
    const compiled = fixture.debugElement.nativeElement;
    const rows = compiled.querySelectorAll('.detail-row');

    expect(rows[0].textContent).toContain('ID:');
    expect(rows[0].textContent).toContain(mockTrainingSubject.id);

    expect(rows[1].textContent).toContain('Subject Name:');
    expect(rows[1].textContent).toContain(mockTrainingSubject.subject);

    expect(rows[2].textContent).toContain('Description:');
    expect(rows[2].textContent).toContain(mockTrainingSubject.description);
  });

  it('should have a "Close" button that triggers close()', () => {
    spyOn(component, 'close');
    const closeBtn = fixture.debugElement.nativeElement.querySelector('button');
    closeBtn.click();
    expect(component.close).toHaveBeenCalled();
  });

});
