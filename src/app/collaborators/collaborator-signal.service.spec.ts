import { TestBed } from '@angular/core/testing';

import { CollaboratorSignalService } from './collaborator-signal.service';
import { HttpClient } from '@angular/common/http';
import { Collaborator } from './collaborator';

describe('CollaboratorService', () => {
  let service: CollaboratorSignalService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        CollaboratorSignalService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(CollaboratorSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set selectedCollaborator when selectCollaborator is called', () => {
    const collaborator : Collaborator =
    {
      collabId: "1",
      userId: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      userPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };
    service.selectCollaborator(collaborator)

    expect(service.selectedCollaborator()).toEqual(collaborator);
  });

  
  it('should set updatedCollaborator when updateCollaborator is called', () => {
    const collaboratorUpdated : Collaborator =
    {
      collabId: "1",
      userId: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      userPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };
    service.updateCollaborator(collaboratorUpdated)

    expect(service.updatedCollaborator()).toEqual(collaboratorUpdated);
  });

  it('should set isCreatingCollaborator to true when startCreateCollaborator is called', () => {
    service.startCreateCollaborator();

    expect(service.isCreatingCollaborator()).toBe(true);
  });

  it('should set isCreatingCollaborator to false when cancelCreateCollaborator is called', () => {
    service.cancelCreateCollaborator();

    expect(service.isCreatingCollaborator()).toBe(false);
  });

  it('should set selectedCollaboratorHoliday when selectCollaboratorHolidays is called', () => {
    const collaborator : Collaborator =
    {
      collabId: "1",
      userId: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      userPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };
    service.selectCollaboratorHolidays(collaborator)

    expect(service.selectedCollaboratorHoliday()).toEqual(collaborator);
  });

  it('should set selectedCollaboratorProjects when selectCollaboratorProjects is called', () => {
    const collaborator : Collaborator =
    {
      collabId: "1",
      userId: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      userPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };
    service.selectCollaboratorProjects(collaborator)

    expect(service.selectedCollaboratorProjects()).toEqual(collaborator);
  });
});
