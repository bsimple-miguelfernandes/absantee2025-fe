import { TestBed } from '@angular/core/testing';
import { SubjectService } from './subject.service';
import { Subject, SubjectPageDTO } from '../models/subject.model';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SubjectService', () => {
  let service: SubjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SubjectService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SubjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch subjects with pagination', () => {
    const mockResponse: SubjectPageDTO = {
      pageSubjects: [
        { id: '1', description: 'Math', details: 'Algebra' },
        { id: '2', description: 'Science', details: 'Physics' }
      ]
    };

    service.getSubjects(1, 5).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:5007/api/subjects?pageIndex=1&pageSize=5');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add a new subject', () => {
    const newSubject: Subject = {
      id: '123',
      description: 'History',
      details: 'World Wars'
    };

    service.addSubject('History', 'World Wars').subscribe(response => {
      expect(response).toEqual(newSubject);
    });

    const req = httpMock.expectOne('http://localhost:5121/api/subjects');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ description: 'History', details: 'World Wars' });

    req.flush(newSubject);
  });
});