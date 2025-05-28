import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CollaboratorDataService } from './collaborator-data.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Collaborator } from './collaborator';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { environment } from '../../environments/environment';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';
import { HolidayPeriod } from './collaborator-holidays/holiday-period';

describe('CollaboratorDataService', () => {
  let service: CollaboratorDataService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiBaseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollaboratorDataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CollaboratorDataService);
    httpMock = TestBed.inject(HttpTestingController);

    httpMock.expectOne(`${baseUrl}/collaborators/details`).flush([]);
  });

  afterEach(() => httpMock.verify());

  it('should fetch all collaborators', fakeAsync(() => {
    const mockCollaborators: Collaborator[] = [
      {
        collabId: '1',
        userId: '1',
        names: "John",
        surnames: 'Doe',
        email: "JohnDoe@email.com",
        userPeriod: {
          _initDate: new Date('2024-01-01'),
          _finalDate: new Date('2024-12-31')
        },
        collaboratorPeriod:
        {
          _initDate: new Date('2024-02-01'),
          _finalDate: new Date('2024-11-31')
        }
      }
    ];

    let result: Collaborator[] = [];

    service.getCollabs().subscribe(r => (result = r));

    const req = httpMock.expectOne(`${baseUrl}/collaborators`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCollaborators);

    tick();
    expect(result).toEqual(mockCollaborators);
  }));

  it('should fetch collaborator by the id', fakeAsync(() => {
    const collabId = '1';
    const mockCollaborator: Collaborator = {
      collabId: collabId,
      userId: '1',
      names: "John",
      surnames: 'Doe',
      email: "JohnDoe@email.com",
      userPeriod: {
        _initDate: new Date('2024-01-01'),
        _finalDate: new Date('2024-12-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2024-02-01'),
        _finalDate: new Date('2024-11-31')
      }
    };

    let result: Collaborator | undefined;

    service.getCollabById(collabId).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${baseUrl}/collaborators/${collabId}/details`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCollaborator);

    tick();
    expect(result).toEqual(mockCollaborator);
  }));

  it('should create collaborator given a request object', fakeAsync(() => {
    const mockCollaboratorCreateRequest: CollaboratorCreateRequest = {
      names: "John",
      surnames: "Doe",
      email: "johnDoe@email.com",
      deactivationDate: new Date("2025-09-12"),
      periodDateTime: {
        _initDate: new Date("2024-01-01"),
        _finalDate: new Date("2027-05-05")
      }
    };

    let result: CollaboratorCreateRequest | undefined;
    service.createCollaborator(mockCollaboratorCreateRequest).subscribe(p => (result = p));

    const req = httpMock.expectOne(`${baseUrl}/collaborators`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCollaboratorCreateRequest);

    req.flush(mockCollaboratorCreateRequest);

    tick();
    expect(result).toEqual(mockCollaboratorCreateRequest);
  }));

  it('should update a collaborator when passing a collaborator with existing id', fakeAsync(() => {
    const mockCollaborator: Collaborator = {
      collabId: '1',
      userId: '1',
      names: "John",
      surnames: 'Doe',
      email: "JohnDoe@email.com",
      userPeriod: {
        _initDate: new Date('2024-01-01'),
        _finalDate: new Date('2024-12-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2024-02-01'),
        _finalDate: new Date('2024-11-31')
      }
    };

    let result!: Collaborator;
    service.updateCollaborator(mockCollaborator).subscribe(p => (result = p));

    const req = httpMock.expectOne(`${baseUrl}/collaborators`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockCollaborator);

    req.flush(mockCollaborator);

    tick();
    expect(result).toEqual(mockCollaborator);
  }));

  it("should fetch collaborator's holiday periods", fakeAsync(() => {
    const collab = '1';
    const mockHolidayPeriods: HolidayPeriod[] = [
      {
        id: '1',
        periodDate: {
          initDate: "2025-09-09",
          finalDate: "2025-10-09"
        }
      },
      {
        id: '2',
        periodDate: {
          initDate: "2025-11-09",
          finalDate: "2025-12-09"
        }
      }
    ];

    let result!: HolidayPeriod[];
    service.getCollaboratorHolidays(collab).subscribe(p => (result = p));

    const req = httpMock.expectOne(`${baseUrl}/collaborators/${collab}/holidayplan/holidayperiod`);
    expect(req.request.method).toBe('GET');

    req.flush(mockHolidayPeriods);

    tick();
    expect(result).toEqual(mockHolidayPeriods);
  }));

  it("should add a new holiday period to a user's holiday plan", fakeAsync(() => {
    const collabId = '1';
    const initDate = '2025-09-09';
    const finalDate = '2025-10-10';
    const mockHolidayPeriod: HolidayPeriod = {
      id: '1',
      periodDate: {
        initDate: initDate,
        finalDate: finalDate
      }
    };

    let result;
    service.addHoliday(collabId, initDate, finalDate).subscribe(p => (result = p));
    const req = httpMock.expectOne(`${baseUrl}/collaborators/${collabId}/holidayplan/holidayperiod`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ initDate, finalDate });

    req.flush(mockHolidayPeriod);

    tick();
    expect(result!.periodDate).toEqual(mockHolidayPeriod.periodDate);
  }));

  it("should update the edited holiday period", fakeAsync(() => {
    const collabId = '1';
    const initDate = '2025-09-09';
    const finalDate = '2025-10-10';
    const mockHolidayPeriod: HolidayPeriod = {
      id: '1',
      periodDate: {
        initDate: initDate,
        finalDate: finalDate
      }
    };

    let result: any;
    service.editHoliday(collabId, mockHolidayPeriod).subscribe(p => (result = p));
    const req = httpMock.expectOne(`${baseUrl}/collaborators/${collabId}/holidayplan/holidayperiod`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockHolidayPeriod);

    req.flush(mockHolidayPeriod);

    tick();
    expect(result).toEqual(mockHolidayPeriod);
  }));

  it('should fetch associations by id', fakeAsync(() => {
    const collabId = '1';
    const mockAssociations: AssociationProjectCollaborators[] = [
      {
        id: "1",
        projectId: "1",
        projectAcronym: "T1",
        collaboratorId: collabId,
        collaboratorEmail: "test1@example.com",
        periodDate: {
          initDate: new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      }
    ];

    let result!: AssociationProjectCollaborators[];
    service.getAssociations(collabId).subscribe(p => (result = p));

    const req = httpMock.expectOne(`${baseUrl}/collaborators/${collabId}/associations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAssociations);

    tick();
    expect(result).toEqual(mockAssociations);
  }));
});
