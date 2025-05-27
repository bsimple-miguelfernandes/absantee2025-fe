import { TestBed } from '@angular/core/testing';

import { ProjectsDataService } from './projects-data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProjectsDataService', () => {
  let service: ProjectsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProjectsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
