import { TestBed } from '@angular/core/testing';

import { CollaboratorSignalService } from './collaborator-signal.service';
import { HttpClient } from '@angular/common/http';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { Signal } from '@angular/core';

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
    const collaborator : CollaboratorDetails =
    {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };
    service.selectCollaborator(collaborator)

    expect(service.selectedCollaborator()).toEqual(collaborator);
  });

  
  it('should set updatedCollaborator when updateCollaborator is called', () => {
    const collaboratorUpdated : CollaboratorDetails =
    {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "new-email@example.com",
      periodDateTime: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };
    service.updateCollaborator(collaboratorUpdated)

    expect(service.updatedCollaborator()).toEqual(collaboratorUpdated);
  });
});
