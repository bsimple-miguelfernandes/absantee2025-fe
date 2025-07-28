import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator.component';
import { ActivatedRoute } from '@angular/router';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { ProjectsDataService } from '../projects/projects-data.service';
import { of, throwError } from 'rxjs';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { By } from '@angular/platform-browser';

describe('AssociationsProjectCollaboratorComponent', () => {
  let component: AssociationsProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsProjectCollaboratorComponent>;
  let mockRoute: any;
  let mockProjectService: jasmine.SpyObj<ProjectsDataService>;
  let mockCollabService: jasmine.SpyObj<CollaboratorDataService>;

  const mockAssociations: AssociationProjectCollaborators[] = [
    {
      id: '1',
      projectId: 'proj1',
      projectTitle: 'Awesome Project',
      projectAcronym: 'PRJ',
      collaboratorId: 'collab1',
      collaboratorName: 'John Doe',
      collaboratorEmail: 'collab@email.com',
      periodDate: {
        initDate: new Date('2024-01-01'),
        finalDate: new Date('2024-12-31')
      }
    }
  ];

  beforeEach(async () => {
    mockProjectService = jasmine.createSpyObj('ProjectsDataService', ['getAssociations']);
    mockCollabService = jasmine.createSpyObj('CollaboratorDataService', ['getAssociations']);

    mockRoute = {
      paramMap: of(new Map([['selectedId', 'mockId']])),
      parent: {
        snapshot: {
          toString: () => '/projects/details'
        }
      },
      snapshot: {
        paramMap: {
          get: () => 'mockId'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: ProjectsDataService, useValue: mockProjectService },
        { provide: CollaboratorDataService, useValue: mockCollabService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should determine isInProject based on route', () => {
    fixture.detectChanges();
    expect(component.isInProject).toBeTrue();
  });

  it('should load project associations if in project context', () => {
    mockProjectService.getAssociations.and.returnValue(of(mockAssociations));

    fixture.detectChanges();

    expect(mockProjectService.getAssociations).toHaveBeenCalledWith('mockId');
    expect(component.associations.length).toBe(1);
  });

  it('should load collaborator associations if not in project context', () => {
    mockRoute.parent.snapshot.toString = () => '/collaborators/details';
    component.isInProject = false;
    mockCollabService.getAssociations.and.returnValue(of(mockAssociations));

    fixture.detectChanges();

    expect(mockCollabService.getAssociations).toHaveBeenCalledWith('mockId');
    expect(component.associations.length).toBe(1);
  });

  it('should show create form when onStartCreate is called', () => {
    component.showCreateForm = false;
    component.onStartCreate();
    expect(component.showCreateForm).toBeTrue();
  });

  it('should hide create form and reload data when onCancelCreate is called', () => {
    component.showCreateForm = true;
    component.isInProject = true;
    mockProjectService.getAssociations.and.returnValue(of(mockAssociations));

    component.onCancelCreate();

    expect(component.showCreateForm).toBeFalse();
    expect(component.associations.length).toBe(1);
  });

  describe('HTML rendering', () => {
    it('should show "No associations" message if associations are empty', () => {
      component.associations = [];
      fixture.detectChanges();

      const message = fixture.debugElement.query(By.css('p'));
      expect(message.nativeElement.textContent).toContain('No associations found.');
    });

    it('should show the correct table headers based on isInProject', () => {
      component.isInProject = true;
      component.associations = mockAssociations;
      fixture.detectChanges();

      const headers = fixture.debugElement.queryAll(By.css('th'));
      expect(headers[0].nativeElement.textContent).toContain('Email');
    });

    it('should display association data in table', () => {
      component.isInProject = true;
      component.associations = mockAssociations;
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('table tr'));
      expect(rows.length).toBe(2);
      expect(rows[1].nativeElement.textContent).toContain('collab@email.com');
    });
  });
});
