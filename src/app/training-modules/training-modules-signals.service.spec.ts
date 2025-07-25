import { TestBed } from '@angular/core/testing';
import { TrainingModuleSignalService } from './training-modules-signals.service';
import { TrainingModule } from './training-module';
import { PeriodDateTime } from '../PeriodDate';

describe('TrainingModuleSignalService', () => {
  let service: TrainingModuleSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingModuleSignalService],
    });
    service = TestBed.inject(TrainingModuleSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set updatedTrainingModule when updateTrainingModule is called', () => {
    const trainingModule: TrainingModule = {
      id: '1',
      trainingSubjectId: '101',
      periods: [
        { _initDate: new Date('2025-01-01'), _finalDate: new Date('2025-01-10') },
        { _initDate: new Date('2025-02-01'), _finalDate: new Date('2025-02-15') },
      ],
    };

    service.updateTrainingModule(trainingModule);
    expect(service.updatedTrainingModule()).toEqual(trainingModule);
  });

  it('should set createdTrainingModule when saveTrainingModule is called', () => {
    const trainingModule: TrainingModule = {
      id: '2',
      trainingSubjectId: '102',
      periods: [
        { _initDate: new Date('2025-03-01'), _finalDate: new Date('2025-03-10') },
      ],
    };

    service.saveTrainingModule(trainingModule);
    expect(service.createdTrainingModule()).toEqual(trainingModule);
  });

  it('should set createdTrainingModule to undefined when addTrainingModule is called', () => {
    service.addTrainingModule();
    expect(service.createdTrainingModule()).toBeUndefined();
  });

  it('should clear updatedTrainingModule when clearUpdatedModule is called', () => {
    const trainingModule: TrainingModule = {
      id: '3',
      trainingSubjectId: '103',
      periods: [
        { _initDate: new Date('2025-04-01'), _finalDate: new Date('2025-04-10') },
      ],
    };

    service.updateTrainingModule(trainingModule);
    expect(service.updatedTrainingModule()).toEqual(trainingModule);

    service.clearUpdatedModule();
    expect(service.updatedTrainingModule()).toBeUndefined();
  });

  it('should clear createdTrainingModule when clearCreatedModule is called', () => {
    const trainingModule: TrainingModule = {
      id: '4',
      trainingSubjectId: '104',
      periods: [
        { _initDate: new Date('2025-05-01'), _finalDate: new Date('2025-05-10') },
      ],
    };

    service.saveTrainingModule(trainingModule);
    expect(service.createdTrainingModule()).toEqual(trainingModule);

    service.clearCreatedModule();
    expect(service.createdTrainingModule()).toBeUndefined();
  });
});
