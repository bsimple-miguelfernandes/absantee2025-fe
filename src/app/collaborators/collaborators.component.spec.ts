import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorSignalService } from './collaborator-signal.service';
import { signal, WritableSignal } from '@angular/core';
import { CollaboratorDataService } from './collaborator-data.service';
import { of, throwError } from 'rxjs';
import { Collaborator } from './collaborator';
import { ProjectsDataService } from '../projects/projects-data.service';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;
  let dataServiceDouble: jasmine.SpyObj<CollaboratorDataService>;
  let signalServiceDouble: jasmine.SpyObj<CollaboratorSignalService>;
  let mockProjectsDataService: jasmine.SpyObj<ProjectsDataService>;

  let selectedCollabSignal: WritableSignal<Collaborator | undefined>;
  let selectedCollabHolidaySignal: WritableSignal<Collaborator | undefined>;
  let selectedCollabProject: WritableSignal<Collaborator | undefined>;
  let updatedCollabSignal: WritableSignal<Collaborator | undefined>;

  const collabsListDouble: Collaborator[] = [
    { 
      collabId: "0196b4ee-a7fc-750f-a698-6a5dfd27ce71",
      userId: "37726a9c-7246-4074-bd06-f2a58b494230",
      names: "John",
      surnames: "Doe",
      email: "john.doe@example.com",
      userPeriod: {
        _initDate: new Date("2022-05-28T13:07:27.358Z"),
        _finalDate: new Date("2027-05-28T13:07:27.358Z")
      },
      collaboratorPeriod: {
        _initDate: new Date("2023-05-28T13:07:27.358Z"),
        _finalDate: new Date("2026-05-28T13:07:27.358Z")
      }
    },
    { 
      collabId: "b2c7e5d1-8f3a-4c2e-9a1b-2e5d7f8c9b10",
      userId: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      names: "Jane",
      surnames: "Smith",
      email: "jane.smith@example.com",
      userPeriod: {
        _initDate: new Date("2021-03-15T09:00:00.000Z"),
        _finalDate: new Date("2026-03-15T09:00:00.000Z")
      },
      collaboratorPeriod: {
        _initDate: new Date("2022-04-01T08:30:00.000Z"),
        _finalDate: new Date("2025-04-01T08:30:00.000Z")
      }
    }
  ];

  beforeEach(async () => {
    selectedCollabSignal = signal<Collaborator | undefined>(undefined);
    selectedCollabHolidaySignal = signal<Collaborator | undefined>(undefined);
    selectedCollabProject = signal<Collaborator | undefined>(undefined);
    updatedCollabSignal = signal<Collaborator | undefined>(undefined);


    const dataServiceSpy = jasmine.createSpyObj('CollaboratorDataService', [
      'getCollabs', 
      'updateCollaborator',
      'getCollaboratorHolidays',
      'getAssociations'
    ]);
    
    const signalServiceSpy = jasmine.createSpyObj('CollaboratorSignalService', [
      'selectCollaborator',
      'selectCollaboratorHolidays', 
      'startCreateCollaborator',
      'isCreatingCollaborator'
    ], {
      selectedCollaborator: selectedCollabSignal,
      updatedCollaborator: updatedCollabSignal,
      selectedCollaboratorHoliday: selectedCollabHolidaySignal,
      selectedCollaboratorProjects: selectedCollabProject
    });

    dataServiceSpy.getCollabs.and.returnValue(of(collabsListDouble));
    mockProjectsDataService = jasmine.createSpyObj('ProjectsDataService', ['getAssociations']);

    await TestBed.configureTestingModule({
      imports: [CollaboratorsComponent], 
      providers: [
        { provide: CollaboratorDataService, useValue: dataServiceSpy },
        { provide: CollaboratorSignalService, useValue: signalServiceSpy },
        { provide: ProjectsDataService, useValue: mockProjectsDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorsComponent);
    component = fixture.componentInstance;
    dataServiceDouble = TestBed.inject(CollaboratorDataService) as jasmine.SpyObj<CollaboratorDataService>;
    signalServiceDouble = TestBed.inject(CollaboratorSignalService) as jasmine.SpyObj<CollaboratorSignalService>;
    signalServiceDouble.isCreatingCollaborator.and.returnValue(false);

  });


  // component.ts
  it("should load collaborators on initialization", () => {
    // arrange

    // act

    // assert
    expect(dataServiceDouble.getCollabs).toHaveBeenCalled();
    expect(component.collaborators).toEqual(collabsListDouble);
    expect(component.collaborators.length).toBe(2);
  });

  it('should handle error when loading collaborators fails', () => {
    // arrange
    const erro = {status: 400, message:"Bad Request"};

    dataServiceDouble.getCollabs.and.returnValue(throwError(() => erro));

    spyOn(console, "error");
    spyOn(window, "alert");

    // act
    // cria-se um componente porque o erro aparece no construtor
    fixture = TestBed.createComponent(CollaboratorsComponent);
    fixture.detectChanges();


    // assert
    expect(window.alert).toHaveBeenCalledWith('Error loading collaborators');
    expect(console.error).toHaveBeenCalledWith('Error loading collaborators', erro);
  });

  it("should initialize collaborator and collaboratorHolidayPlans as undefined", () => {
    // arrange

    // act

    // assert
    expect(signalServiceDouble.selectCollaborator).toHaveBeenCalledWith(undefined);
    expect(signalServiceDouble.selectCollaboratorHolidays).toHaveBeenCalledWith(undefined);
  });

  it("should update collaborators list when a collaborator is updated", () => {
    const updatedCollab = { 
      collabId: "0196b4ee-a7fc-750f-a698-6a5dfd27ce71",
      userId: "37726a9c-7246-4074-bd06-f2a58b494230",
      names: "UpdatedName",
      surnames: "UpdatedSurname",
      email: "updated@gmail.com",
      userPeriod: {
        _initDate: new Date("2023-05-28T13:07:27.358Z"),
        _finalDate: new Date("2028-05-28T13:07:27.358Z")
      },
      collaboratorPeriod: {
        _initDate: new Date("2024-05-28T13:07:27.358Z"),
        _finalDate: new Date("2027-05-28T13:07:27.358Z")
      }
    }


  });

  it('should call signal service startCreateCollaborator in startCreate method', () => {
    // arrange
    component.startCreate();

    // act
    
    // assert
    expect(signalServiceDouble.startCreateCollaborator).toHaveBeenCalled();
  });

  // component.html
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show collaborator table component with collaborators", () => {
    // arrange
    const collabTableComponent = fixture.nativeElement.querySelector("app-collaborator-list");

    // act

    // assert
    expect(collabTableComponent).toBeTruthy();
  });

  it("should show collaborator bullet list component with collaborators", () => {
    // arrange
    const collabListComponent = fixture.nativeElement.querySelector("app-collaborators-bullets");

    // act

    // assert
    expect(collabListComponent).toBeTruthy();
  });

  it("should show create collaborator component when creating a collaborator", () => {
    // arrange
    signalServiceDouble.isCreatingCollaborator.and.returnValue(true);

    // act
    fixture.detectChanges();
    const createComponent = fixture.nativeElement.querySelector("app-collaborator-create");

    // assert
    expect(createComponent).toBeTruthy();
  });

  it("should hide create collaborator component when not creating a collaborator", () => {
    // arrange
    signalServiceDouble.isCreatingCollaborator.and.returnValue(false);

    // act
    fixture.detectChanges();
    const createComponent = fixture.nativeElement.querySelector("app-collaborator-create");

    // assert
    expect(createComponent).toBeFalsy();
  });

   it('should show "Criar Colaborador" button if the create collaborator is not rendered (signal is false) ', () => {
    signalServiceDouble.isCreatingCollaborator.and.returnValue(false);

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('[data-test-id="create-collab-button"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Criar Colaborador');  
  })

  it('should not render "Criar Colaborador" button when isCreatingCollaborator is true', () => {
    signalServiceDouble.isCreatingCollaborator.and.returnValue(true);

    fixture.detectChanges();

    const createButton = fixture.nativeElement.querySelector('[data-test-id="create-collab-button"]');
    expect(createButton).toBeNull();
});


  it("should show collaborator details if selected collaborator", () => {
    // arrange
    selectedCollabSignal.set(collabsListDouble[0]);
  
    // act
    fixture.detectChanges();
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
  
    // assert
    expect(collaboratorDetails).toBeTruthy();
  });

  it("should not show collaborator details if collaborator not selected", () => {
    // arrange

    // act
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
  
    // assert
    expect(collaboratorDetails).toBeFalsy();
  });

  it("should show collaborator holidays if selected collaborator holidays", () => {
    // arrange
    selectedCollabHolidaySignal.set(collabsListDouble[0]);

    // act
    fixture.detectChanges();
    const collaboratorHolidays = fixture.nativeElement.querySelector('app-collaborator-holidays');

    // assert
    expect(collaboratorHolidays).toBeTruthy();
  });

 /*  it("should update collabs list when collaborator updated", () => {
    // arrange
    updatedCollab.set()

    // act

    // assert
  }) */

});
