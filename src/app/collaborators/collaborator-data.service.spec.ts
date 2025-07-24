import { TestBed } from '@angular/core/testing';
import { CollaboratorDataService } from './collaborator-data.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Collaborator, UpdateCollab } from './collaborator';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';
import { HolidayPeriod, HolidayPeriodDTO } from './collaborator-holidays/holiday-period';
import { AssociationProjectCollaborators, AssociationProjectCollaboratorsDTO } from '../associations-project-collaborator/association-project-collaborator.model';
import { User } from './user';
import { AssociationProjectCollaboratorCreateRequest } from '../associations-project-collaborator/add-collaborator-project/add-association';

describe('CollaboratorDataService', () => {
  let service: CollaboratorDataService;
  let httpMock: HttpTestingController;

  const associationsProjectCollaboratorQueryBaseUrl = environment.associationsProjectCollaboratorQueryBaseUrl;
  const associationsProjectCollaboratorCmdBaseUrl = environment.associationsProjectCollaboratorCMDBaseUrl;
  const collaboratorCMDBaseUrl = environment.collaboratorCMDBaseURL;
  const collaboratorQueryBaseUrl = environment.collaboratorQueryBaseURL;
  const userQueryBaseUrl = environment.userQueryBaseUrl;
  const userCmdBaseUrl = environment.userCmdBaseUrl;
  const holidaysCmdBaseUrl = environment.holidaysCmdBaseUrl;
  const holidaysQueryBaseUrl = environment.holidaysQueryBaseUrl;

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
  });

  afterEach(() => httpMock.verify());

  it('should fetch all collaborators with details', (() => {
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
    
    const req = httpMock.expectOne(`${collaboratorQueryBaseUrl}/details`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCollaborators);

    expect(result).toEqual(mockCollaborators);
  }));

  it('should fetch collaborator by the id', (() => {
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

    const req = httpMock.expectOne(`${collaboratorQueryBaseUrl}/${collabId}/details`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCollaborator);
    
    expect(result).toEqual(mockCollaborator);
  }));

  it('should create collaborator given a request object', (() => {
    const mockCollaboratorCreateRequest: CollaboratorCreateRequest = {
      names: "John",
      surnames: "Doe",
      email: "johnDoe@email.com",
      finalDate: new Date("2025-09-12"),
      periodDateTime: {
        _initDate: new Date("2024-01-01"),
        _finalDate: new Date("2027-05-05")
      }
    };

    const createdCollaborator: Collaborator = {
      collabId: '1',
      userId: '1',
      names: mockCollaboratorCreateRequest.names,
      surnames: mockCollaboratorCreateRequest.surnames,
      email: mockCollaboratorCreateRequest.email,
      collaboratorPeriod: mockCollaboratorCreateRequest.periodDateTime,
      userPeriod: mockCollaboratorCreateRequest.periodDateTime
    }

    let result: Collaborator | undefined;
    service.createCollaborator(mockCollaboratorCreateRequest).subscribe(p => (result = p));

    const req = httpMock.expectOne(`${collaboratorCMDBaseUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCollaboratorCreateRequest);

    req.flush(createdCollaborator);
    
    expect(result).toEqual(createdCollaborator);
  }));

  it('should update a user given a collaborator', (() => {
    const updatedCollaborator: Collaborator = {
      collabId: '1',
      userId: '123',
      names: "Alice",
      surnames: "Smith",
      email: "alice.smith@example.com",
      userPeriod: {
        _initDate: new Date('2024-01-01'),
        _finalDate: new Date('2024-12-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2024-01-01'),
        _finalDate: new Date('2024-12-31')
      }
    };

  const expectedUser: User = {
      id: updatedCollaborator.userId,
      names: updatedCollaborator.names,
      surnames: updatedCollaborator.surnames,
      email: updatedCollaborator.email,
      Period: updatedCollaborator.userPeriod
    };

    let result: User | undefined;

    service.updateUser(updatedCollaborator).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${userCmdBaseUrl}/${updatedCollaborator.userId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(expectedUser);

    req.flush(expectedUser);

    expect(result).toEqual(expectedUser);
  }));

  it('should update collaborator period given a collaborator', (() => {
    const updatedCollaborator: Collaborator = {
      collabId: '1',
      userId: '123',
      names: "Alice",
      surnames: "Smith",
      email: "alice.smith@example.com",
      userPeriod: {
        _initDate: new Date('2024-01-01'),
        _finalDate: new Date('2024-12-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2024-02-01'),
        _finalDate: new Date('2024-11-30')
      }
    };

    const expectedUpdate: UpdateCollab = {
      Id: updatedCollaborator.collabId,
      PeriodDateTime: updatedCollaborator.collaboratorPeriod
    };

    let result: UpdateCollab | undefined;

    service.updateCollaborator(updatedCollaborator).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${collaboratorCMDBaseUrl}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(expectedUpdate);

    req.flush(expectedUpdate);

    expect(result).toEqual(expectedUpdate);
  }));

  it('should fetch holidays for a given collaborator ID', (() => {
    const collaboratorId = '1';

    const mockHolidays: HolidayPeriodDTO[] = [
      {
        id: 'h1',
        periodDate: {
          initDate: '2024-07-01',
          finalDate: '2024-07-15'
        }
      },
      {
        id: 'h2',
        periodDate: {
          initDate: '2024-08-10',
          finalDate: '2024-08-20'
        }
      }
    ];

    let result: HolidayPeriodDTO[] = [];

    service.getCollaboratorHolidays(collaboratorId).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${holidaysQueryBaseUrl}/${collaboratorId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHolidays);

    expect(result).toEqual(mockHolidays);
  }));

  it('should add a holiday for a given collaborator ID', (() => {
    const collaboratorId = '1';
    const initDate = '2024-12-20';
    const finalDate = '2025-01-05';

    const mockResponse: HolidayPeriod = {
      id: 'h123',
      periodDate: {
        initDate: initDate,
        finalDate: finalDate
      }
    };

    let result: HolidayPeriod | undefined;

    service.addHoliday(collaboratorId, initDate, finalDate).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${holidaysCmdBaseUrl}/${collaboratorId}/holidayperiod`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ initDate: initDate, finalDate: finalDate });

    req.flush(mockResponse);

    expect(result).toEqual(mockResponse);
  }));


  it('should edit a holiday period for a given collaborator ID', (() => {
    const collaboratorId = '1';

    const updatedPeriod: HolidayPeriod = {
      id: 'h123',
      periodDate: {
        initDate: '2024-12-20',
        finalDate: '2025-01-05'
      }
    };

    let result: HolidayPeriod | undefined;

    service.editHoliday(collaboratorId, updatedPeriod).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${holidaysCmdBaseUrl}/${collaboratorId}/holidayperiod`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPeriod);

    req.flush(updatedPeriod);

    expect(result).toEqual(updatedPeriod);
  }));

  it('should fetch associations for a given collaborator and map the DTOs', (() => {
    const collaboratorId = '1';

    const mockDtoList: AssociationProjectCollaboratorsDTO[] = [
      {
        id: 'a1',
        projectId: 'p1',
        projectTitle: 'Project One',
        projectAcronym: 'P1',
        collaboratorId: collaboratorId,
        collaboratorName: 'Alice Smith',
        collaboratorEmail: 'alice@example.com',
        periodDate: {
          initDate: new Date('2024-01-01'),
          finalDate: new Date('2024-12-31')
        }
      }
    ];

    const expectedMappedList: AssociationProjectCollaborators[] = mockDtoList.map(dto => ({
      ...dto,
      periodDate: dto.periodDate
    }));

    let result: AssociationProjectCollaborators[] = [];

    service.getAssociations(collaboratorId).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${associationsProjectCollaboratorQueryBaseUrl}/collaborator/${collaboratorId}/details`);
    expect(req.request.method).toBe('GET');

    req.flush(mockDtoList);

    expect(result).toEqual(expectedMappedList);
  }));

  it('should create an association and return mapped AssociationProjectCollaborators', (() => {
    const createRequest: AssociationProjectCollaboratorCreateRequest = {
      collaboratorId: '1',
      projectId: '101',
      periodDate: {
        initDate: '2024-05-01',
        finalDate: '2024-10-31'
      }
    };

    const mockDtoResponse: AssociationProjectCollaboratorsDTO = {
      id: 'assoc1',
      projectId: createRequest.projectId,
      projectTitle: 'Awesome Project',
      projectAcronym: 'AP',
      collaboratorId: createRequest.collaboratorId,
      collaboratorName: 'John Doe',
      collaboratorEmail: 'john@example.com',
      periodDate: {
        initDate: new Date('2024-05-01'),
        finalDate: new Date('2024-10-31')
      }
    };

    const expectedMappedResult: AssociationProjectCollaborators = {
      ...mockDtoResponse,
      periodDate: mockDtoResponse.periodDate
    };

    let result: AssociationProjectCollaborators | undefined;

    service.createAssociation(createRequest).subscribe(r => (result = r));

    const req = httpMock.expectOne(`${associationsProjectCollaboratorCmdBaseUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(createRequest);

    req.flush(mockDtoResponse);

    expect(result).toEqual(expectedMappedResult);
  }));



});
