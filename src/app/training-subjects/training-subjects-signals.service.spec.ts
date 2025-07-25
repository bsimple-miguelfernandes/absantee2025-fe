import { TestBed } from '@angular/core/testing';
import { TrainingSubjectSignalsService } from './training-subjects-signals.service';
import { TrainingSubject } from './training-subject';

describe('TrainingSubjectSignalsService', () => {
  let service: TrainingSubjectSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingSubjectSignalsService],
    });
    service = TestBed.inject(TrainingSubjectSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set updatedTrainingSubject when updateTrainingSubject is called', () => {
    const trainingSubject: TrainingSubject = {
      id: '1',
      subject: 'Angular Basics',
      description: 'Introduction to Angular framework',
    };

    service.updateTrainingSubject(trainingSubject);
    expect(service.updatedTrainingSubject()).toEqual(trainingSubject);
  });

  it('should set createdTrainingSubject when saveTrainingSubject is called', () => {
    const trainingSubject: TrainingSubject = {
      id: '2',
      subject: 'Advanced TypeScript',
      description: 'Deep dive into TypeScript features',
    };

    service.saveTrainingSubject(trainingSubject);
    expect(service.createdTrainingSubject()).toEqual(trainingSubject);
  });

  it('should set createdTrainingSubject to undefined when addTrainingSubject is called', () => {
    service.addTrainingSubject();
    expect(service.createdTrainingSubject()).toBeUndefined();
  });

  it('should clear updatedTrainingSubject when clearUpdatedSubject is called', () => {
    const trainingSubject: TrainingSubject = {
      id: '3',
      subject: 'RxJS Observables',
      description: 'Reactive programming with RxJS',
    };

    service.updateTrainingSubject(trainingSubject);
    expect(service.updatedTrainingSubject()).toEqual(trainingSubject);

    service.clearUpdatedSubject();
    expect(service.updatedTrainingSubject()).toBeUndefined();
  });

  it('should clear createdTrainingSubject when clearCreatedSubject is called', () => {
    const trainingSubject: TrainingSubject = {
      id: '4',
      subject: 'NgRx Store',
      description: 'State management with NgRx',
    };

    service.saveTrainingSubject(trainingSubject);
    expect(service.createdTrainingSubject()).toEqual(trainingSubject);

    service.clearCreatedSubject();
    expect(service.createdTrainingSubject()).toBeUndefined();
  });
});
