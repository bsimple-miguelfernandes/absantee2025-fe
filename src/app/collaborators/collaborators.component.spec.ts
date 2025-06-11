import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorSignalService } from './services/collaborator-signal.service';
import { signal, WritableSignal } from '@angular/core';
import { CollaboratorDataService } from './services/collaborator-data.service';
import { of, throwError } from 'rxjs';
import { Collaborator } from './collaborator.model';
import { HolidayPeriod } from './collaborator-holidays/holiday-period';
import { toCollaboratorViewModel } from './mappers/collaborator.mapper';
import { CollaboratorViewModel } from './collaborator-details/collaborator.viewmodel';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;
  let dataServiceSpy: jasmine.SpyObj<CollaboratorDataService>;
  let signalServiceSpy: jasmine.SpyObj<CollaboratorSignalService>;

  let selectedCollabSignal: WritableSignal<CollaboratorViewModel | undefined>;
  let selectedCollabHolidaySignal: WritableSignal<CollaboratorViewModel | undefined>;
  let selectedCollabProject: WritableSignal<CollaboratorViewModel | undefined>;
  let updatedCollabSignal: WritableSignal<any>;
  let createCollabSignal: WritableSignal<any>;

  const collabsListDouble: CollaboratorViewModel[] = [
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

  const mockHolidayPeriod: HolidayPeriod = {
    id: 'holiday-001',
    periodDate: {
      initDate: '2024-06-01',
      finalDate: '2024-06-10'
    }
  };

  beforeEach(async () => {
    selectedCollabSignal = signal<CollaboratorViewModel | undefined>(undefined);
    selectedCollabHolidaySignal = signal<CollaboratorViewModel | undefined>(undefined);
    selectedCollabProject = signal<CollaboratorViewModel | undefined>(undefined);
    updatedCollabSignal = signal<any>(undefined);
    createCollabSignal = signal<any>(undefined);

    dataServiceSpy = jasmine.createSpyObj('CollaboratorDataService', [
      'getCollabs',
      'updateCollaborator',
      'getCollaboratorHolidays',
      'getAssociations'
    ]);

    signalServiceSpy = jasmine.createSpyObj('CollaboratorSignalService', [
      'selectCollaborator',
      'updatedCollaborator',
      'selectCollaboratorHolidays',
      'startCreateCollaborator',
      'isCreatingCollaborator'
    ], {
      selectedCollaborator: selectedCollabSignal,
      updatedCollaborator: updatedCollabSignal,
      selectedCollaboratorHoliday: selectedCollabHolidaySignal,
      selectedCollaboratorProjects: selectedCollabProject,
      createdCollaborator: createCollabSignal
    });

    dataServiceSpy.getCollabs.and.returnValue(of(collabsListDouble));
    signalServiceSpy.isCreatingCollaborator.and.returnValue(false);
    dataServiceSpy.getCollaboratorHolidays.and.returnValue(of([mockHolidayPeriod]));

    await TestBed.configureTestingModule({
      imports: [CollaboratorsComponent],
      providers: [
        { provide: CollaboratorDataService, useValue: dataServiceSpy },
        { provide: CollaboratorSignalService, useValue: signalServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load collaborators on initialization", () => {
    const expected = collabsListDouble.map(toCollaboratorViewModel);
    expect(component.collaborators()).toEqual(expected);
  });

  it('should handle error when loading collaborators fails', () => {
    const erro = { status: 400, message: "Bad Request" };
    dataServiceSpy.getCollabs.and.returnValue(throwError(() => erro));
    spyOn(console, "error");
    spyOn(window, "alert");

    fixture = TestBed.createComponent(CollaboratorsComponent);
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith('Error loading collaborators');
    expect(console.error).toHaveBeenCalledWith('Error loading collaborators', erro);
  });

  it("should initialize collaborator and collaboratorHolidayPlans as undefined", () => {
    expect(signalServiceSpy.selectCollaborator).toHaveBeenCalledWith(undefined);
    expect(signalServiceSpy.selectCollaboratorHolidays).toHaveBeenCalledWith(undefined);
  });

  //   it('should update collaborator when collaboratorUpdated signal changes', fakeAsync(() => {
  //   fixture.detectChanges(); 
  //   const updated = toCollaboratorViewModel({ ...collabsListDouble[0], names: 'Updated Name' });

  //   updatedCollabSignal.set(updated); 
  //   flushEffects(); 

  //   fixture.detectChanges();
  //   const updatedItem = component.collaborators().find(c => c.collabId === updated.collabId);
  //   expect(updatedItem?.names).toBe('Updated Name');
  // }));

  // it('should add collaborator when createdCollaborator signal changes', fakeAsync(() => {
  //   const created = toCollaboratorViewModel({
  //     ...collabsListDouble[1],
  //     collabId: 'new-id',
  //     names: 'Novo'
  //   });

  //   createCollabSignal.set(created);
  //   tick();

  //   expect(component.collaborators().some(c => c.collabId === 'new-id')).toBeTrue();
  // }));

  it('should call signal service startCreateCollaborator in startCreate method', () => {
    component.startCreate();
    expect(signalServiceSpy.startCreateCollaborator).toHaveBeenCalled();
  });

  it("should show collaborator table component with collaborators", () => {
    const element = fixture.nativeElement.querySelector("app-collaborator-list");
    expect(element).toBeTruthy();
  });

  it("should show collaborator bullet list component with collaborators", () => {
    const element = fixture.nativeElement.querySelector("app-collaborators-bullets");
    expect(element).toBeTruthy();
  });

  it("should show create collaborator component when creating a collaborator", () => {
    signalServiceSpy.isCreatingCollaborator.and.returnValue(true);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector("app-collaborator-create");
    expect(element).toBeTruthy();
  });

  it("should hide create collaborator component when not creating a collaborator", () => {
    signalServiceSpy.isCreatingCollaborator.and.returnValue(false);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector("app-collaborator-create");
    expect(element).toBeFalsy();
  });

  it('should show "Criar Colaborador" button if not creating', () => {
    signalServiceSpy.isCreatingCollaborator.and.returnValue(false);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-test-id="create-collab-button"]');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Criar Colaborador');
  });

  it('should not show "Criar Colaborador" button if creating', () => {
    signalServiceSpy.isCreatingCollaborator.and.returnValue(true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('[data-test-id="create-collab-button"]');
    expect(button).toBeNull();
  });

  it("should show collaborator details if selected collaborator", () => {
    selectedCollabSignal.set(collabsListDouble[0]);
    fixture.detectChanges();
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collaboratorDetails).toBeTruthy();
  });

  it("should not show collaborator details if no collaborator selected", () => {
    fixture.detectChanges();
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collaboratorDetails).toBeFalsy();
  });

  it("should show collaborator holidays if selected collaborator holidays", () => {
    selectedCollabHolidaySignal.set(collabsListDouble[0]);
    fixture.detectChanges();
    const collaboratorHolidays = fixture.nativeElement.querySelector('app-collaborator-holidays');
    expect(collaboratorHolidays).toBeTruthy();
  });
});

function flushEffects() {
  throw new Error('Function not implemented.');
}

