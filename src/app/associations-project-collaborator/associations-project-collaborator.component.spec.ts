import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator.component';
import { ProjectsDataService } from '../projects/projects-data.service';

describe('AssociationsProjectCollaboratorComponent', () => {
  let component: AssociationsProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsProjectCollaboratorComponent>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;

  beforeEach(async () => {
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getAssociations']);
    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent],
      providers: [
        { provide: ProjectsDataService, useValue: mockProjectsDataService }
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
