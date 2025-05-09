import { TestBed } from '@angular/core/testing';

import { CollaboratorService } from './collaborator.service';
import { HttpClient } from '@angular/common/http';

describe('CollaboratorService', () => {
  let service: CollaboratorService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        CollaboratorService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(CollaboratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
