import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { associationProjectCollaboratorResolver } from './association-project-collaborator.resolver';

describe('associationProjectCollaboratorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => associationProjectCollaboratorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
