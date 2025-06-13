import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorDataService } from './collaborator-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Collaborator } from './collaborator';
import { CollaboratorViewModel } from './collaborator-details/collaborator.viewmodel';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;
  let mockCollaboratorDataService: jasmine.SpyObj<CollaboratorDataService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  const mockCollaborators: Collaborator[] = [
    {
      collabId: 'c1',
      userId: 'u1',
      names: 'Ana',
      surnames: 'Silva',
      email: 'ana.silva@example.com',
      userPeriod: {
        _initDate: new Date('2022-01-01'),
        _finalDate: new Date('2022-12-31'),
      },
      collaboratorPeriod: {
        _initDate: new Date('2023-01-01'),
        _finalDate: new Date('2023-12-31'),
      },
    },
    {
      collabId: 'c2',
      userId: 'u2',
      names: 'Bruno',
      surnames: 'Costa',
      email: 'bruno.costa@example.com',
      userPeriod: {
        _initDate: new Date('2021-03-15'),
        _finalDate: new Date('2021-09-15'),
      },
      collaboratorPeriod: {
        _initDate: new Date('2022-01-01'),
        _finalDate: new Date('2022-12-31'),
      },
    },
    {
      collabId: 'c3',
      userId: 'u3',
      names: 'Carlos',
      surnames: 'Santos',
      email: 'carlos.santos@example.com',
      userPeriod: {
        _initDate: new Date('2023-06-01'),
        _finalDate: new Date('2023-12-31'),
      },
      collaboratorPeriod: {
        _initDate: new Date('2024-01-01'),
        _finalDate: new Date('2024-12-31'),
      },
    },
  ];


  beforeEach(async () => {
    const collaboratorDataServiceSpy = jasmine.createSpyObj('CollaboratorDataService', ['getCollabs']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      imports: [
        CollaboratorsComponent, 
        HttpClientTestingModule 
      ],
      providers: [
        { provide: CollaboratorDataService, useValue: collaboratorDataServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        provideRouter([])
      ]
    }).compileComponents();

    mockCollaboratorDataService = TestBed.inject(CollaboratorDataService) as jasmine.SpyObj<CollaboratorDataService>;
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    mockDialogRef = dialogRefSpy;

    
    mockCollaboratorDataService.getCollabs.and.returnValue(of(mockCollaborators));
  });

  describe('Component Initialization', () => {

    it('should create component successfully', () => {
      fixture = TestBed.createComponent(CollaboratorsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should inject CollaboratorDataService', () => {
      fixture = TestBed.createComponent(CollaboratorsComponent);
      component = fixture.componentInstance;

      expect(component.collaborators).toBeTruthy();
    });

    it('should initialize collaborators signal as empty array', () => {
      fixture = TestBed.createComponent(CollaboratorsComponent);

      component = fixture.componentInstance;

      expect(component.collaborators()).toBeDefined();
      expect(Array.isArray(component.collaborators())).toBe(true);
    })

    it('should load collaborators on initialization', () => {
      fixture = TestBed.createComponent(CollaboratorsComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();

      expect(mockCollaboratorDataService.getCollabs).toHaveBeenCalledTimes(1);
      expect(component.collaborators().length).toBe(3);
      expect(component.collaborators()[0].email).toBe('ana.silva@example.com');
      expect(component.collaborators()[1].email).toBe('bruno.costa@example.com');
      expect(component.collaborators()[2].email).toBe('carlos.santos@example.com');
    })

    it('should handle error when loading collaborators on initialization', () => {
      const error = new Error('API Error');
      mockCollaboratorDataService.getCollabs.and.returnValue(throwError(() => error));
      spyOn(window,'alert');
      spyOn(console,'error');

      fixture = TestBed.createComponent(CollaboratorsComponent);
      component= fixture.componentInstance;
      fixture.detectChanges();

      expect(window.alert).toHaveBeenCalledWith('Error loading collaborators');
      expect(console.error).toHaveBeenCalledWith('Error loading collaborators', error);
      expect(component.collaborators()).toEqual([]);
    })

    it('should handle empty collaborators array from service', () => {
      mockCollaboratorDataService.getCollabs.and.returnValue(of([]));

      fixture = TestBed.createComponent(CollaboratorsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.collaborators()).toEqual([]);
      expect(component.collaborators().length).toBe(0);
    })
  })

  // describe('openCreate method', () => {
  //   beforeEach(() => {
  //     fixture= TestBed.createComponent(CollaboratorsComponent);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });

  //   it('should open create dialog', () => {
  //     component.openCreate();

  //     expect(mockDialog.open).toHaveBeenCalledWith(CollaboratorDetailsComponent);
  //   });


    
  // })




  

});