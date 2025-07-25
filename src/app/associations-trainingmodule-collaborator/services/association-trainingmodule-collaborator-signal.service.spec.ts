import { TestBed } from '@angular/core/testing';

import { AssociationTrainingmoduleCollaboratorSignalService } from './association-trainingmodule-collaborator-signal.service';

describe('AssociationTrainingmoduleCollaboratorSignalService', () => {
  let service: AssociationTrainingmoduleCollaboratorSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationTrainingmoduleCollaboratorSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
