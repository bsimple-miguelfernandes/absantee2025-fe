import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { CollaboratorSignalService } from './collaborator-signal.service';
import { signal, WritableSignal } from '@angular/core';
import { CollaboratorDataService } from './collaborator-data.service';
import { of } from 'rxjs';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;
  let mockCollaboratorDataService: jasmine.SpyObj<CollaboratorDataService>;
  let collaboratorsSignal: WritableSignal<CollaboratorDetails[]>;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedSignal: WritableSignal<CollaboratorDetails | undefined>;
  let updatedSignal: WritableSignal<CollaboratorDetails | undefined>;
  let selectedCollaboratorHolidaysSignal: WritableSignal<CollaboratorDetails | undefined>;
  let selectedCollaboratorProjectsSignal: WritableSignal<CollaboratorDetails | undefined>;

  beforeEach(async () => {
    collaboratorsSignal = signal<CollaboratorDetails[]>([]);
    mockCollaboratorDataService = jasmine.createSpyObj('CollaboratorDataService', ['updateCollaborator', 'getCollaboratorHolidays'], {
      collaborators: collaboratorsSignal
    })
    selectedSignal = signal<CollaboratorDetails | undefined>(undefined);
    updatedSignal = signal<CollaboratorDetails | undefined>(undefined);
    selectedCollaboratorHolidaysSignal = signal<CollaboratorDetails | undefined>(undefined);
    selectedCollaboratorProjectsSignal = signal<CollaboratorDetails | undefined>(undefined);
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['selectCollaborator', 'selectCollaboratorHolidays'], {
      selectedCollaborator: selectedSignal,
      updatedCollaborator: updatedSignal,
      selectedCollaboratorHoliday: selectedCollaboratorHolidaysSignal,
      selectedCollaboratorProjects: selectedCollaboratorProjectsSignal
    });

    await TestBed.configureTestingModule({
      imports: [CollaboratorsComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService },
        { provide: CollaboratorDataService, useValue: mockCollaboratorDataService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsComponent);
    component = fixture.componentInstance;

    collaboratorsSignal.set([
      {
        id: "1",
        names: "Alice",
        surnames: "Johnson",
        email: "alice.johnson@example.com",
        periodDateTime: {
          _initDate: new Date(2019, 5, 10),
          _finalDate: new Date(2025, 11, 31)
        }
      },
      {
        id: "2",
        names: "Bob",
        surnames: "Martinez",
        email: "bob.martinez@example.com",
        periodDateTime: {
          _initDate: new Date(2021, 1, 1),
          _finalDate: new Date(2024, 6, 30)
        }
      },
      {
        id: "3",
        names: "Clara",
        surnames: "Nguyen",
        email: "clara.nguyen@example.com",
        periodDateTime: {
          _initDate: new Date(2020, 3, 15),
          _finalDate: new Date(2030, 8, 1)
        }
      }
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show collaborator details on init because selectedCollaborator is undefined', () => {
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collaboratorDetails).toBeNull();
  });

  it('should not show collaborator holidays on init because selectedCollaboratorHolidays is undefined', () => {
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-holidays');
    expect(collaboratorDetails).toBeNull();
  });

  it('should not show collaborator projects on init because selectedCollaboratorProject is undefined', () => {
    const collaboratorDetails = fixture.nativeElement.querySelector('app-associations-project-collaborator');
    expect(collaboratorDetails).toBeNull();
  });

  it('should show collaborator list and collaborator bullets on init', () => {
    const collaboratorList = fixture.nativeElement.querySelector('app-collaborator-list');
    const collaboratorBullets = fixture.nativeElement.querySelector('app-collaborators-bullets');

    expect(collaboratorList).not.toBeNull();
    expect(collaboratorBullets).not.toBeNull();
  });


  it('should show collaborator details when selectedCollaborator signal changes', () => {
    const collaborator: CollaboratorDetails = {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date(2019, 5, 10),
        _finalDate: new Date(2025, 11, 31)
      }
    };
    selectedSignal.set(collaborator);

    fixture.detectChanges();

    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
    expect(collaboratorDetails).not.toBeNull();
  });

  it('should show collaborator holidays when selectedCollaboratorHolidays signal changes', () => {
    const collaborator: CollaboratorDetails = {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date(2019, 5, 10),
        _finalDate: new Date(2025, 11, 31)
      }
    };
    
    mockCollaboratorDataService.getCollaboratorHolidays.and.returnValue(of([]));
    selectedCollaboratorHolidaysSignal.set(collaborator);

    fixture.detectChanges();

    const collaboratorHolidays = fixture.nativeElement.querySelector('app-collaborator-holidays');
    expect(collaboratorHolidays).not.toBeNull();
  });

  it('should show collaborator Projects when selectedCollaboratorProject signal changes', () => {
    const collaborator: CollaboratorDetails = {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date(2019, 5, 10),
        _finalDate: new Date(2025, 11, 31)
      }
    };
    
    selectedCollaboratorProjectsSignal.set(collaborator);

    fixture.detectChanges();

    const collaboratorProjects = fixture.nativeElement.querySelector('app-associations-project-collaborator');
    expect(collaboratorProjects).not.toBeNull();
  });

  /* it('should call updateCollaborator when a collaborator is updated', () => {
    const collaboratorUpdated = collaboratorsSignal()[1];
    collaboratorUpdated.email = "new-email@test.com";

    updatedSignal.set(collaboratorUpdated);
    fixture.detectChanges();

    expect(mockCollaboratorDataService.updateCollaborator).toHaveBeenCalledOnceWith(collaboratorUpdated);
  }); */

  // it('should show collaborator details when button of CollaboratorListComponent is clicked', () => {
  //   const listComponent: HTMLElement = fixture.debugElement.query(By.directive(CollaboratorListComponent)).nativeElement;

  //   const button = listComponent.querySelectorAll('button')[1];
  //   button.click();
  //   fixture.detectChanges();

  //   const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
  //   expect(collaboratorDetails).not.toBeNull();
  // });

  // it('should update collaborator when save button is clicked on CollaboratorDetails', () => {
  //   component.selectedCollaborator.set(collaborators[0]);
  //   fixture.detectChanges();

  //   const detailsComponent = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent)).nativeElement;
  //   const emailInput: HTMLInputElement = detailsComponent.querySelector('#email');
  //   emailInput.value = 'changed@email.com';
  //   fixture.detectChanges();

  //   const saveButton: HTMLElement = deta
  // ilsComponent.querySelector('button');
  //   const newCollaborator = collaborators[0];
  //   newCollaborator.email = 'changed@email.com';
  //   saveButton.click();

  //   expect(mockCollaboratorSignalService.updateCollaborator).toHaveBeenCalledOnceWith(newCollaborator);
  // });

  // it('should update collaborator list when getCollaborators change', () => {
  //   const newCollaborators = collaborators
  //   newCollaborators[1].email = 'changed@email.com';

  //   mockCollaboratorSignalService.getCollaborators.and.returnValue(newCollaborators);
  //   fixture.detectChanges();

  //   const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');
  //   const cells2 = rows[2].querySelectorAll('td');
  //   expect(cells2[1].textContent).toEqual('changed@email.com')
  // });
});
