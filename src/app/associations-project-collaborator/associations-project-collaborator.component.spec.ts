/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { AssociationsProjectCollaboratorComponent } from './associations-project-collaborator.component';
import { ProjectsDataService } from '../projects/projects-data.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';

describe('AssociationsProjectCollaboratorComponent', () => {
  let component: AssociationsProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsProjectCollaboratorComponent>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;
  let mockCollaboratorDataService: jasmine.SpyObj<CollaboratorDataService>;

  // Dados de teste
  const testAssociations: AssociationProjectCollaborators[] = [
    {
      id: '1',
      projectId: 'p1',
      projectAcronym: 'PRJ1',
      collaboratorId: 'c1',
      collaboratorEmail: 'email1@test.com',
      periodDate: {
        initDate: new Date('2023-01-01'),
        finalDate: new Date('2023-12-31')
      }
    },
    {
      id: '2',
      projectId: 'p2',
      projectAcronym: 'PRJ2',
      collaboratorId: 'c2',
      collaboratorEmail: 'email2@test.com',
      periodDate: {
        initDate: new Date('2024-01-01'),
        finalDate: new Date('2024-12-31')
      }
    }
  ];

  beforeEach(async () => {
    // Criar mocks dos serviços
    const projectsServiceSpy = jasmine.createSpyObj('ProjectsDataService', ['getProjects']);
    const collaboratorServiceSpy = jasmine.createSpyObj('CollaboratorDataService', ['getCollaborators']);
    
    // Mock do ActivatedRoute
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('test-id')
        }
      },
      parent: {
        snapshot: {
          toString: jasmine.createSpy('toString').and.returnValue('/projects/test')
        }
      },
      data: of({ AssociationData: testAssociations })
    });

    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent, DatePipe],
      providers: [
        { provide: ProjectsDataService, useValue: projectsServiceSpy },
        { provide: CollaboratorDataService, useValue: collaboratorServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    component = fixture.componentInstance;
    
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    mockProjectsDataService = TestBed.inject(ProjectsDataService) as jasmine.SpyObj<ProjectsDataService>;
    mockCollaboratorDataService = TestBed.inject(CollaboratorDataService) as jasmine.SpyObj<CollaboratorDataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedId from route parameters', () => {
    // Act
    fixture.detectChanges();
    
    // Assert
    expect(component.selectedId).toBe('test-id');
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('selectedId');
  });

  it('should set isInProject to true when route contains "projects"', () => {
    // Act
    fixture.detectChanges();
    
    // Assert
    expect(component.isInProject).toBe(true);
  });

  it('should set isInProject to false when route does not contain "projects"', async () => {
    // Arrange - Criar um novo TestBed com rota diferente
    const newActivatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('test-id')
        }
      },
      parent: {
        snapshot: {
          toString: jasmine.createSpy('toString').and.returnValue('/collaborators/test')
        }
      },
      data: of({ AssociationData: testAssociations })
    });

    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent, DatePipe],
      providers: [
        { provide: ProjectsDataService, useValue: jasmine.createSpyObj('ProjectsDataService', ['getProjects']) },
        { provide: CollaboratorDataService, useValue: jasmine.createSpyObj('CollaboratorDataService', ['getCollaborators']) },
        { provide: ActivatedRoute, useValue: newActivatedRouteSpy }
      ]
    }).compileComponents();

    const newFixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    const newComponent = newFixture.componentInstance;
    
    // Act
    newFixture.detectChanges();
    
    // Assert
    expect(newComponent.isInProject).toBe(false);
  });

  it('should load associations from route data on ngOnInit', () => {
    // Act
    component.ngOnInit();
    fixture.detectChanges();
    
    // Assert
    expect(component.associations).toEqual(testAssociations);
    expect(component.associations.length).toBe(2);
  });

  it('should have correct association data structure', () => {
    // Act
    component.ngOnInit();
    fixture.detectChanges();
    
    // Assert
    const firstAssociation = component.associations[0];
    expect(firstAssociation.id).toBe('1');
    expect(firstAssociation.projectId).toBe('p1');
    expect(firstAssociation.projectAcronym).toBe('PRJ1');
    expect(firstAssociation.collaboratorId).toBe('c1');
    expect(firstAssociation.collaboratorEmail).toBe('email1@test.com');
    expect(firstAssociation.periodDate.initDate).toEqual(new Date('2023-01-01'));
    expect(firstAssociation.periodDate.finalDate).toEqual(new Date('2023-12-31'));
  });

  it('should inject services correctly', () => {
    // Act
    fixture.detectChanges();
    
    // Assert
    expect(component.collaboratorDataService).toBeDefined();
    expect(component.projectsDataService).toBeDefined();
  });

  // Teste para verificar se o componente reage a mudanças nos dados da rota
  it('should update associations when route data changes', async () => {
    // Arrange - Primeiro inicializar com dados originais
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.associations.length).toBe(2);

    const newAssociations: AssociationProjectCollaborators[] = [
      {
        id: '3',
        projectId: 'p3',
        projectAcronym: 'PRJ3',
        collaboratorId: 'c3',
        collaboratorEmail: 'email3@test.com',
        periodDate: {
          initDate: new Date('2025-01-01'),
          finalDate: new Date('2025-12-31')
        }
      }
    ];

    // Recriar o componente com novos dados
    const newActivatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('test-id')
        }
      },
      parent: {
        snapshot: {
          toString: jasmine.createSpy('toString').and.returnValue('/projects/test')
        }
      },
      data: of({ AssociationData: newAssociations })
    });

    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent, DatePipe],
      providers: [
        { provide: ProjectsDataService, useValue: mockProjectsDataService },
        { provide: CollaboratorDataService, useValue: mockCollaboratorDataService },
        { provide: ActivatedRoute, useValue: newActivatedRouteSpy }
      ]
    }).compileComponents();

    const newFixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    const newComponent = newFixture.componentInstance;
    
    // Act
    newComponent.ngOnInit();
    newFixture.detectChanges();
    
    // Assert
    expect(newComponent.associations).toEqual(newAssociations);
    expect(newComponent.associations.length).toBe(1);
  });
});

// Teste adicional para cenários de erro
describe('AssociationsProjectCollaboratorComponent Error Scenarios', () => {
  let component: AssociationsProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsProjectCollaboratorComponent>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue(null)
        }
      },
      parent: {
        snapshot: {
          toString: jasmine.createSpy('toString').and.returnValue('/other/route')
        }
      },
      data: of({ AssociationData: [] })
    });

    await TestBed.configureTestingModule({
      imports: [AssociationsProjectCollaboratorComponent, DatePipe],
      providers: [
        { provide: ProjectsDataService, useValue: jasmine.createSpyObj('ProjectsDataService', ['getProjects']) },
        { provide: CollaboratorDataService, useValue: jasmine.createSpyObj('CollaboratorDataService', ['getCollaborators']) },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationsProjectCollaboratorComponent);
    component = fixture.componentInstance;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should handle empty associations array', () => {
    // Act
    component.ngOnInit();
    fixture.detectChanges();
    
    // Assert
    expect(component.associations).toEqual([]);
    expect(component.associations.length).toBe(0);
  });

  it('should handle null selectedId', () => {
    // Act
    fixture.detectChanges();
    
    // Assert
    expect(component.selectedId).toBeNull();
  });
}); */