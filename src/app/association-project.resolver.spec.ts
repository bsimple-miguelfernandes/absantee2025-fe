import { TestBed } from '@angular/core/testing';
import { AssociationProjectResolver } from './association-project.resolver';
import { ProjectsDataService } from './projects/projects-data.service';

describe('AssociationPRojectResolver', () => {
  let resolver: AssociationProjectResolver;
  let serviceSpy: jasmine.SpyObj<ProjectsDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProjectDataService', ['getAssociations']);

    TestBed.configureTestingModule({
      providers: [
        AssociationProjectResolver,
        { provide: ProjectsDataService, useValue: spy }
      ]
    });

    resolver = TestBed.inject(AssociationProjectResolver);
    serviceSpy = TestBed.inject(ProjectsDataService) as jasmine.SpyObj<ProjectsDataService>;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
