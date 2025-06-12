import { TestBed } from '@angular/core/testing';
import { AssociationCollaboratorResolver } from './association-collaborator.resolver';
import { CollaboratorDataService } from './collaborators/collaborator-data.service';

describe('AssociationCollaboratorResolver', () => {
  let resolver: AssociationCollaboratorResolver;
  let serviceSpy: jasmine.SpyObj<CollaboratorDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CollaboratorDataService', ['getAssociations']);

    TestBed.configureTestingModule({
      providers: [
        AssociationCollaboratorResolver,
        { provide: CollaboratorDataService, useValue: spy }
      ]
    });

    resolver = TestBed.inject(AssociationCollaboratorResolver);
    serviceSpy = TestBed.inject(CollaboratorDataService) as jasmine.SpyObj<CollaboratorDataService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
