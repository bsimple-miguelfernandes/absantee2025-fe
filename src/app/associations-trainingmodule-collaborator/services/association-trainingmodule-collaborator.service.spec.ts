import { TestBed } from '@angular/core/testing';
import { AssociationTrainingmoduleCollaboratorService } from './association-trainingmodule-collaborator.service';

describe('AssociationTrainingmoduleCollaboratorService', () => {
  let service: AssociationTrainingmoduleCollaboratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationTrainingmoduleCollaboratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
