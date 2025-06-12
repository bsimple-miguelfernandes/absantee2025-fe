import { TestBed } from '@angular/core/testing';
import { CollaboratorHolidaysResolver } from './collaborator-holidays.resolver';
import { CollaboratorDataService } from '../collaborator-data.service';

describe('AssociationCollaboratorResolver', () => {
  let resolver: CollaboratorHolidaysResolver;
  let serviceSpy: jasmine.SpyObj<CollaboratorDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CollaboratorDataService', ['getCollabById']);

    TestBed.configureTestingModule({
      providers: [
        CollaboratorHolidaysResolver,
        { provide: CollaboratorDataService, useValue: spy }
      ]
    });

    resolver = TestBed.inject(CollaboratorHolidaysResolver);
    serviceSpy = TestBed.inject(CollaboratorDataService) as jasmine.SpyObj<CollaboratorDataService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
