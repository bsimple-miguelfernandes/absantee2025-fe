import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsComponent } from './collaborators.component';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { CollaboratorSignalService } from './collaborator-signal.service';
import { By } from '@angular/platform-browser';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { signal, WritableSignal } from '@angular/core';

describe('CollaboratorsComponent', () => {
  let component: CollaboratorsComponent;
  let fixture: ComponentFixture<CollaboratorsComponent>;
  let collaborator : CollaboratorDetails;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedSignal: WritableSignal<CollaboratorDetails | undefined>;
  let updatedSignal: WritableSignal<CollaboratorDetails | undefined>;

  beforeEach(async () => {
    selectedSignal = signal<CollaboratorDetails | undefined>(undefined);
    updatedSignal = signal<CollaboratorDetails | undefined>(undefined);
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', [], {
      selectedCollaborator: selectedSignal,
      updatedCollaborator: updatedSignal
    });

    await TestBed.configureTestingModule({
      imports: [CollaboratorsComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsComponent);
    component = fixture.componentInstance;

    selectedSignal.set(undefined);
    updatedSignal.set(undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show collaborator details on init because selectedCollaborator is undefined', () => {
    const collaboratorDetails = fixture.nativeElement.querySelector('app-collaborator-details');
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
