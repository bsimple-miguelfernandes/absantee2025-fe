import { TestBed } from '@angular/core/testing';

import { AssociationsProjectCollaboratorDataService } from './associations-project-collaborator-data.service';

describe('AssociationsProjectCollaboratorDataService', () => {
  let service: AssociationsProjectCollaboratorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationsProjectCollaboratorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
