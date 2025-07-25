import { TestBed } from '@angular/core/testing';
import { TrainingSubjectDataService } from './training-subjects-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { TrainingSubject } from './training-subject';

describe('TrainingSubjectDataService', () => {
  let service: TrainingSubjectDataService;
  let httpMock: HttpTestingController;

  const mockSubjects: TrainingSubject[] = [
    { id: '1', subject: 'Subject 1', description: 'Description 1' },
    { id: '2', subject: 'Subject 2', description: 'Description 2' },
  ];

  const mockSubject: TrainingSubject = { id: '1', subject: 'Subject 1', description: 'Description 1' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrainingSubjectDataService]
    });
    service = TestBed.inject(TrainingSubjectDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTrainingSubjects should return a list of training subjects', () => {
    service.getTrainingSubjects().subscribe(subjects => {
      expect(subjects.length).toBe(2);
      expect(subjects).toEqual(mockSubjects);
    });

    const req = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingSubjects`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubjects);
  });

  it('getTrainingSubjectById should return a single training subject by ID', () => {
    const id = '1';

    service.getTrainingSubjectById(id).subscribe(subject => {
      expect(subject).toEqual(mockSubject);
    });

    const req = httpMock.expectOne(`${environment.trainingSujectandModelQueryBaseUrl}/trainingSubjects/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSubject);
  });

  it('updateTrainingSubject should send a PUT request and return the updated subject', () => {
    const updatedSubject: TrainingSubject = { id: '1', subject: 'Updated Subject', description: 'Updated Description' };

    service.updateTrainingSubject(updatedSubject).subscribe(subject => {
      expect(subject).toEqual(updatedSubject);
    });

    const req = httpMock.expectOne(`${environment.trainingSujectandModelCmdBaseUrl}/trainingSubjects`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSubject);
    req.flush(updatedSubject);
  });

  it('addTrainingSubject should send a POST request and return the new subject', () => {
    const newSubject: TrainingSubject = { id: '3', subject: 'New Subject', description: 'New Description' };

    service.addTrainingSubject(newSubject).subscribe(subject => {
      expect(subject).toEqual(newSubject);
    });

    const req = httpMock.expectOne(`${environment.trainingSujectandModelCmdBaseUrl}/trainingSubjects`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSubject);
    req.flush(newSubject);
  });
});
