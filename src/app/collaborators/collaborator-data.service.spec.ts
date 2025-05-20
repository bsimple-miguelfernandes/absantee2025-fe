import { TestBed } from '@angular/core/testing';

import { CollaboratorDataService } from './collaborator-data.service';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';

describe('CollaboratorDataService', () => {
  let service: CollaboratorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaboratorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update collaborator list when updateCollaborator is called', () => {
    const updated: CollaboratorDetails = {
      id: "1",
      names: "Test",
      surnames: "Test",
      email: "new-email@example.com",
      periodDateTime: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };

    service.updateCollaborator(updated);

    const updatedList = service.collaborators();
    const collaborator = updatedList.find(c => c.id === "1");

    expect(collaborator).toEqual(updated);
  });
});
