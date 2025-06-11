import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { associationCollaboratorResolver } from './association-collaborator.resolver';

describe('associationCollaboratorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => associationCollaboratorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
