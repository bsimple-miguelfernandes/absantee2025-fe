import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { associationProjectResolver } from './association-project.resolver';

describe('associationProjectResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => associationProjectResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
