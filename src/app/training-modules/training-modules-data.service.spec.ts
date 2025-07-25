import { TestBed } from '@angular/core/testing';
import { TrainingModuleDataService } from './training-modules-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { TrainingModule } from './training-module';
import { TrainingSubject } from '../training-subjects/training-subject';

describe('TrainingModuleDataService', () => {
  let service: TrainingModuleDataService;
  let httpMock: HttpTestingController;

  const mockTrainingModules: TrainingModule[] = [
    {
      id: '1',
      trainingSubjectId: 'a',
      periods: [
        { _initDate: new Date('2025-01-01'), _finalDate: new Date('2025-01-10') }
      ]
    },
    {
      id: '2',
      trainingSubjectId: 'b',
      periods: [
        { _initDate: new Date('2025-02-01'), _finalDate: new Date('2025-02-05') }
      ]
    }
  ];

  const mockTrainingSubjects: TrainingSubject[] = [
    { id: 'a', subject: 'Subject A', description: 'Description A' },
    { id: 'b', subject: 'Subject B', description: 'Description B' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrainingModuleDataService]
    });
    service = TestBed.inject(TrainingModuleDataService);
    httpMock = TestBed.inject(HttpTestingController);

    // Resolver requests iniciais disparados no constructor
    const reqModules = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingModules`);
    reqModules.flush(mockTrainingModules);

    const reqSubjects = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingSubjects`);
    reqSubjects.flush(mockTrainingSubjects);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load training modules on init and update trainingModuleSubject', () => {
    service.trainingModule$.subscribe(modules => {
      expect(modules).toEqual(mockTrainingModules);
    });
  });

  it('should load training subjects on init and update trainingSubjectSubject', () => {
    service.trainingSubject$.subscribe(subjects => {
      expect(subjects).toEqual(mockTrainingSubjects);
    });
  });

  it('getTrainingModuleById should return an Observable with the training module', () => {
    const id = '1';

    service.getTrainingModuleById(id).subscribe(module => {
      expect(module).toEqual(mockTrainingModules[0]);
    });

    const req = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingModules/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrainingModules[0]);
  });

  it('getTrainingSubjectById should return an Observable with the training subject', () => {
    const id = 'a';

    service.getTrainingSubjectById(id).subscribe(subject => {
      expect(subject).toEqual(mockTrainingSubjects[0]);
    });

    const req = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingSubjects/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrainingSubjects[0]);
  });

  it('addTrainingSubject should POST and reload subjects', () => {
    const newSubject: TrainingSubject = { id: 'c', subject: 'Subject C', description: 'Description C' };

    service.addTrainingSubject(newSubject).subscribe(response => {
      expect(response).toEqual(newSubject);
    });

    const postReq = httpMock.expectOne(`${environment.trainingSujectandModelCmdBaseUrl}/trainingSubjects`);
    expect(postReq.request.method).toBe('POST');
    postReq.flush(newSubject);

    const getReq = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingSubjects`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush([...mockTrainingSubjects, newSubject]);
  });

  it('updateTrainingSubject should PUT and reload subjects', () => {
    const updatedSubject: TrainingSubject = { id: 'a', subject: 'Updated Subject A', description: 'Updated Description A' };

    service.updateTrainingSubject(updatedSubject).subscribe(response => {
      expect(response).toEqual(updatedSubject);
    });

    const putReq = httpMock.expectOne(`${environment.trainingSujectandModelCmdBaseUrl}/trainingSubjects`);
    expect(putReq.request.method).toBe('PUT');
    putReq.flush(updatedSubject);

    const getReq = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingSubjects`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush([updatedSubject, mockTrainingSubjects[1]]);
  });

  it('addTrainingModule should POST and reload modules', () => {
    const newModule: TrainingModule = {
      id: '3',
      trainingSubjectId: 'c',
      periods: [
        { _initDate: new Date('2025-03-01'), _finalDate: new Date('2025-03-10') }
      ]
    };

    service.addTrainingModule(newModule).subscribe(response => {
      expect(response).toEqual(newModule);
    });

    const postReq = httpMock.expectOne(`${environment.trainingSujectandModelCmdBaseUrl}/trainingmodules`);
    expect(postReq.request.method).toBe('POST');
    postReq.flush(newModule);

    const getReq = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingModules`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush([...mockTrainingModules, newModule]);
  });

  it('updateTrainingModule should PUT and reload modules', () => {
    const updatedModule: TrainingModule = {
      id: '1',
      trainingSubjectId: 'a',
      periods: [
        { _initDate: new Date('2025-01-05'), _finalDate: new Date('2025-01-15') }
      ]
    };

    service.updateTrainingModule(updatedModule).subscribe(response => {
      expect(response).toEqual(updatedModule);
    });

    const putReq = httpMock.expectOne(`${environment.trainingSujectandModelCmdBaseUrl}/trainingmodules`);
    expect(putReq.request.method).toBe('PUT');
    putReq.flush(updatedModule);

    const getReq = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingModules`);
    expect(getReq.request.method).toBe('GET');
    getReq.flush([updatedModule, mockTrainingModules[1]]);
  });
});
