import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorListComponent } from './collaborator-list.component';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { signal, WritableSignal } from '@angular/core';
import { Collaborator } from '../collaborator';

describe('CollaboratorListComponent', () => {
  let component: CollaboratorListComponent;
  let fixture: ComponentFixture<CollaboratorListComponent>;
  let collaborators: Collaborator[];
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  

  beforeEach(async () => {
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', [
      'selectCollaborator',
      'selectCollaboratorHolidays', 
      'selectCollaboratorProjects'
    ]);

    collaborators = [
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

    await TestBed.configureTestingModule({
      imports: [CollaboratorListComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorListComponent);
    component = fixture.componentInstance;

    

    fixture.componentRef.setInput('collaborators', collaborators);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should show the Collaborators Info in the table', () => {
    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');

    const cells1 = rows[1].querySelectorAll('td');
    expect(cells1[0].textContent).toBe(collaborators[0].names);
    expect(cells1[1].textContent).toBe(collaborators[0].email);

    const cells2 = rows[2].querySelectorAll('td');
    expect(cells2[0].textContent).toBe(collaborators[1].names);
    expect(cells2[1].textContent).toBe(collaborators[1].email);

    const cells3 = rows[3].querySelectorAll('td');
    expect(cells3[0].textContent).toBe(collaborators[2].names);
    expect(cells3[1].textContent).toBe(collaborators[2].email);
  });
 */
  /* it('should call selectCollaborator with the selected collaborator when a button is clicked', () => {
    const button1: HTMLElement = fixture.nativeElement.querySelectorAll('[data-testid="details-btn"]')[1];
    button1.click();

    expect(mockCollaboratorSignalService.selectCollaborator).toHaveBeenCalledOnceWith(collaborators[1]);
  }); */

  /* it('should change the table content if new input arrived', () => {
    const newCollaborators : CollaboratorDetails[] = [
      {
        id: "4",
        names: "John",
        surnames: "Doe",
        email: "john.doe@example.com",
        periodDateTime: {
          _initDate: new Date(2023, 10, 1),
          _finalDate: new Date(2028, 5, 14)
        }
      }
    ];

    fixture.componentRef.setInput('collaborators', newCollaborators);

    fixture.detectChanges();

    const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');

    const cells1 = rows[1].querySelectorAll('td');
    expect(cells1[0].textContent).toBe('John');
    expect(cells1[1].textContent).toBe("john.doe@example.com");
  }); */
});
