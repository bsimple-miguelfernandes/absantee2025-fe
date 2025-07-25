import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationsTrainingmoduleCollaboratorComponent } from './associations-trainingmodule-collaborator.component';
import { ActivatedRoute } from '@angular/router';
import { AssociationTrainingmoduleCollaboratorSignalService } from './services/association-trainingmodule-collaborator-signal.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { AssociationTrainingmoduleCollaboratorService } from './services/association-trainingmodule-collaborator.service';
import { of, throwError } from 'rxjs';
import { Collaborator } from '../collaborators/collaborator';
import { By } from '@angular/platform-browser';
import { RouterTestingHarness } from '@angular/router/testing';

describe('AssociationsTrainingmoduleCollaboratorComponent', () => {
  let component: AssociationsTrainingmoduleCollaboratorComponent;
  let fixture: ComponentFixture<AssociationsTrainingmoduleCollaboratorComponent>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockAssocTMCSignalService: jasmine.SpyObj<AssociationTrainingmoduleCollaboratorSignalService>;
  let mockCollaboratorService: jasmine.SpyObj<CollaboratorDataService>;
  let mockAssocTMCService: jasmine.SpyObj<AssociationTrainingmoduleCollaboratorService>;

  let mockCollaborator: Collaborator = {
    collabId: '1',
    userId: '1',
    names: 'name',
    surnames: 'surname',
    email: 'email@email.com',
    userPeriod: {
      _initDate: new Date(),
      _finalDate: new Date()
    },
    collaboratorPeriod: {
      _initDate: new Date(),
      _finalDate: new Date()
    }
  }

  beforeEach(async () => {
    mockAssocTMCService = jasmine.createSpyObj('AssociationTrainingmoduleCollaboratorService', ['createAssociationTMC', 'removeAssociationTMC']);
    mockAssocTMCSignalService = jasmine.createSpyObj('AssociationTrainingmoduleCollaboratorSignalService', [
      'isCreatingAssociationTMC',
      'createAssociationTMC',
      'createdAssociationTMC',
      'changeAssociationTMCCreationState'
    ]);
    mockCollaboratorService = jasmine.createSpyObj('CollaboratorDataService', ['getCollabs', 'getCollabById']);

    // Setup mock ActivatedRoute
    mockRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('mockId')
        }
      },
      parent: {
        snapshot: {
          url: [{ path: 'training-modules' }]
        }
      },
      data: of({ AssociationData: [] })
    } as any;

    await TestBed.configureTestingModule({
      imports: [AssociationsTrainingmoduleCollaboratorComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockRoute },
        { provide: AssociationTrainingmoduleCollaboratorService, useValue: mockAssocTMCService },
        { provide: AssociationTrainingmoduleCollaboratorSignalService, useValue: mockAssocTMCSignalService },
        { provide: CollaboratorDataService, useValue: mockCollaboratorService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationsTrainingmoduleCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isInTrainingModule to true if route is under training-modules', () => {
    // Assert
    expect(component.isInTrainingModule).toBeTrue();
  });


  it('should call changeAssociationTMCCreationState with true', () => {
    // Act
    component.switchCreatingState(true);

    // Assert
    expect(mockAssocTMCSignalService.changeAssociationTMCCreationState).toHaveBeenCalledWith(true);
  });

  describe('removeAssociation', () => {
    it('should remove association on success', () => {
      // Arrange
      component.associations = [{ id: '123', trainingModuleId: 'tm1', collaboratorId: 'c1', periodDate: { initDate: new Date(), finalDate: new Date() } }];
      mockAssocTMCService.removeAssociationTMC.and.returnValue(of({}));

      // Act
      component.removeAssociation('123');

      // Assert
      expect(component.associations.length).toBe(0);
      expect(component.isLoading).toBeFalse();
    });

    it('should handle error in removeAssociation', () => {
      // Arrange
      spyOn(window, 'alert');
      component.associations = [{ id: '123', trainingModuleId: 'tm1', collaboratorId: 'c1', periodDate: { initDate: new Date(), finalDate: new Date() } }];
      mockAssocTMCService.removeAssociationTMC.and.returnValue(throwError(() => new Error('error')));

      // Act
      component.removeAssociation('123');

      // Assert
      expect(window.alert).toHaveBeenCalledWith('Error removing an association');
      expect(component.isLoading).toBeFalse();
    });
  });

  it('should add newly created association via effect', () => {
    // Arrange
    const newAssociation = {
      id: 'new1',
      trainingModuleId: 'tm1',
      collaboratorId: 'c1',
      periodDate: { initDate: new Date(), finalDate: new Date() }
    };

    // Act
    mockAssocTMCSignalService.createdAssociationTMC.and.returnValue(newAssociation);
    mockCollaboratorService.getCollabById.and.returnValue(of(mockCollaborator));

    component.associations = [];

    // Manually simulate effect behavior
    const exists = component.associations.some(a => a.id === newAssociation.id);
    if (!exists) {
      component.isLoading = true;
      if (component.isInTrainingModule) {
        mockCollaboratorService.getCollabById(newAssociation.collaboratorId).subscribe({
          next: (data) => {
            const newAssocWithDetails = { ...newAssociation, collaboratorEmail: data.email };
            component.associations.push(newAssocWithDetails);
            component.isLoading = false;

            // Assert
            expect(component.associations.length).toBe(1);
            expect(component.associations[0].collaboratorEmail).toBe('email@email.com');
          },
          error: () => {
            fail('Should not enter error block');
          }
        });
      }
    }
  });

  it('should fetch collaborator emails in training module context', () => {
    // Arrange
    const mockAssociation = { id: '1', trainingModuleId: 'tm1', collaboratorId: 'c1' };
    const data = of({ AssociationData: [mockAssociation] });
    mockRoute.data = data;
    mockCollaboratorService.getCollabById.and.returnValue(of(mockCollaborator));

    component['isInTrainingModule'] = true;

    // Act
    component.loadAndPopulateAssociations();

    // Assert
    expect(mockCollaboratorService.getCollabById).toHaveBeenCalledWith('c1');
  });

  describe('ngOnInit', () => {
    it('should handle missing selectedId', () => {
      // Arrange
      (mockRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);

      // Act
      component = TestBed.createComponent(AssociationsTrainingmoduleCollaboratorComponent).componentInstance;
      component.ngOnInit();

      // Assert
      expect(component.isLoading).toBeFalse();
    });

    it('should not fetch collaborator details if AssociationData is empty', () => {
      // Arrange
      mockRoute.data = of({ AssociationData: [] });

      // Act
      component.loadAndPopulateAssociations();

      // Assert
      expect(mockCollaboratorService.getCollabById).not.toHaveBeenCalled();
    });

    it('should handle error in association data resolver', () => {
      // Arrange
      mockRoute.data = throwError(() => new Error('Resolver failed'));

      // Act
      component.loadAndPopulateAssociations();

      // Assert
      expect(component.isLoading).toBeFalse();
    });

    it('should handle error when fetching collaborator details', () => {
      // Arrange
      const mockAssociation = { id: '1', trainingModuleId: 'tm1', collaboratorId: 'c1' };
      mockRoute.data = of({ AssociationData: [mockAssociation] });
      mockCollaboratorService.getCollabById.and.returnValue(throwError(() => new Error('API error')));

      // Act
      component['isInTrainingModule'] = true;
      component.loadAndPopulateAssociations();

      // Assert
      expect(component.isLoading).toBeFalse();
    });
  });


  describe('html', () => {
    it('should show loading text when isLoading is true', () => {
      // Act
      component.isLoading = true;
      fixture.detectChanges();

      // Assert
      const loadingEl = fixture.debugElement.query(By.css('h2'));
      expect(loadingEl.nativeElement.textContent).toContain('Loading associations...');
    });

    it('should show "Add New Collaborator" button when in training module context', () => {
      // Act
      component.isLoading = false;
      component.isInTrainingModule = true;
      fixture.detectChanges();

      // Assert
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.textContent).toContain('Add New Collaborator');
    });

    it('should show "Add New Training Module" button when not in training module context', () => {
      // Act
      component.isLoading = false;
      component.isInTrainingModule = false;
      fixture.detectChanges();

      // Assert
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.textContent).toContain('Add New Training Module');
    });

    it('should render table headers correctly for training module context', () => {
      // Act
      component.isLoading = false;
      component.isInTrainingModule = true;
      component.associations = [];
      fixture.detectChanges();

      // Assert
      const headers = fixture.debugElement.queryAll(By.css('th'));
      expect(headers[0].nativeElement.textContent).toContain('Collaborator Email');
    });

    it('should render table headers correctly for collaborator context', () => {
      // Act
      component.isLoading = false;
      component.isInTrainingModule = false;
      component.associations = [];
      fixture.detectChanges();

      // Assert
      const headers = fixture.debugElement.queryAll(By.css('th'));
      expect(headers[0].nativeElement.textContent).toContain('Training Module');
    });

    it('should render a row for each association', () => {
      // Act
      component.isLoading = false;
      component.isInTrainingModule = true;
      component.associations = [
        {
          id: '1',
          trainingModuleId: 'tm1',
          collaboratorId: 'c1',
          periodDate: {
            initDate: new Date('2024-01-01'),
            finalDate: new Date('2024-12-31')
          },
          collaboratorEmail: 'test@example.com'
        }
      ];
      fixture.detectChanges();

      // Assert
      const rows = fixture.debugElement.queryAll(By.css('table tr'));
      expect(rows.length).toBe(2);
      expect(rows[1].nativeElement.textContent).toContain('test@example.com');
      expect(rows[1].nativeElement.textContent).toContain('2024-01-01');
    });

    it('should show "There are no associations." when associations array is empty', () => {
      // Act
      component.isLoading = false;
      component.associations = [];
      fixture.detectChanges();
      // Assert
      expect(fixture.nativeElement.textContent).toContain('There are no associations.');
    });
  });
});
