import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator.component';
import { ProjectsDataService } from '../projects/projects-data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AssociationsProjectCollaboratorComponent', () => {
  let component: AssociationsProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsProjectCollaboratorComponent>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;

  beforeEach(async () => {
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getAssociations']);
    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent],
      providers: [
        { provide: ProjectsDataService, useValue: mockProjectsDataService },
          provideHttpClient(),
          provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
