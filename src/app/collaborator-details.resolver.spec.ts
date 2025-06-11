import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { collaboratorDetailsResolver } from './collaborator-details.resolver';

describe('collaboratorDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => collaboratorDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
