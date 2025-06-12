import { TestBed } from '@angular/core/testing';
import { CollaboratorDetailsResolver } from './collaborator-details.resolver';
import { CollaboratorDataService } from './collaborators/collaborator-data.service';

describe('AssociationCollaboratorResolver', () => {
  let resolver: CollaboratorDetailsResolver;
  let serviceSpy: jasmine.SpyObj<CollaboratorDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CollaboratorDataService', ['getCollabById']);

    TestBed.configureTestingModule({
      providers: [
        CollaboratorDetailsResolver,
        { provide: CollaboratorDataService, useValue: spy }
      ]
    });

    resolver = TestBed.inject(CollaboratorDetailsResolver);
    serviceSpy = TestBed.inject(CollaboratorDataService) as jasmine.SpyObj<CollaboratorDataService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
