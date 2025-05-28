import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorHolidaysComponent } from './collaborator-holidays.component';
import { signal, WritableSignal } from '@angular/core';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { PeriodDate } from '../../PeriodDate';
import { HolidayPeriod } from './holiday-period';
import { of } from 'rxjs';

describe('CollaboratorHolidaysComponent', () => {
  let component: CollaboratorHolidaysComponent;
  let fixture: ComponentFixture<CollaboratorHolidaysComponent>;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedCollaboratorHolidaysSignal: WritableSignal<CollaboratorDetails | undefined>;
  let mockCollabotadorDataService: jasmine.SpyObj<CollaboratorDataService>;
  let collaborator: CollaboratorDetails;
  let collaboratorHolidays: HolidayPeriod[];

  beforeEach(async () => {
    selectedCollaboratorHolidaysSignal = signal<CollaboratorDetails | undefined>(undefined);
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', [], {
      selectedCollaboratorHoliday: selectedCollaboratorHolidaysSignal
    });
    mockCollabotadorDataService = jasmine.createSpyObj('CollaboratorDataService', ['getCollaboratorHolidays']);
    await TestBed.configureTestingModule({
      imports: [CollaboratorHolidaysComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService },
        { provide: CollaboratorDataService, useValue: mockCollabotadorDataService }
      ]
    })
      .compileComponents();

    collaboratorHolidays = [
        {
          id: "1",
          periodDate: {
            initDate: "2020-01-01",
            finalDate: "2020-01-10"
          }
        },
        {
          id: "2",
          periodDate: {
            initDate:"2020-12-01",
            finalDate: "2020-12-10"
          }
        }
      ];

    mockCollabotadorDataService.getCollaboratorHolidays.and.returnValue(of(collaboratorHolidays));

    collaborator = {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date("2019-06-10"),
        _finalDate: new Date("2025-12-31")
      }
    };
    selectedCollaboratorHolidaysSignal.set(collaborator);
    mockCollabotadorDataService.getCollaboratorHolidays.and.returnValue(of(collaboratorHolidays));

    fixture = TestBed.createComponent(CollaboratorHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the name and surname of selected collaborator', () => {
    const title = fixture.nativeElement.querySelector("h1").textContent;

    expect(title).toEqual(collaborator.names + " " + collaborator.surnames);
  });

  //  it('should show the Holidays Info in the table', () => {
  //   const rows: NodeListOf<HTMLElement> = fixture.nativeElement.querySelectorAll('table tr');

  //   const cells1 = rows[1].querySelectorAll('td');
  //   expect(cells1[0].textContent).toBe(collaboratorHolidays[0].periodDate.initDate);
  //   expect(cells1[1].textContent).toBe(collaboratorHolidays[0].periodDate.finalDate);

  //   const cells2 = rows[2].querySelectorAll('td');
  //   expect(cells2[0].textContent).toBe(collaboratorHolidays[0].periodDate.initDate);
  //   expect(cells2[1].textContent).toBe(collaboratorHolidays[0].periodDate.finalDate);

  // });

  it('when add button is clicked a new element is added to the dorm', () => {
    const button1: HTMLElement = fixture.nativeElement.querySelector('[data-testid="add-btn"]');
    button1.click();

    
  });
});
