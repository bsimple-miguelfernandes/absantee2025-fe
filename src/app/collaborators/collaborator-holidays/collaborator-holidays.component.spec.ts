import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorHolidaysComponent } from './collaborator-holidays.component';
import { signal, WritableSignal } from '@angular/core';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { PeriodDate } from '../../PeriodDate';

describe('CollaboratorHolidaysComponent', () => {
  let component: CollaboratorHolidaysComponent;
  let fixture: ComponentFixture<CollaboratorHolidaysComponent>;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedCollaboratorHolidaysSignal: WritableSignal<CollaboratorDetails | undefined>;
  let mockCollabotadorDataService: jasmine.SpyObj<CollaboratorDataService>;
  let collaborator: CollaboratorDetails;
  let collaboratorHolidays: PeriodDate[];

  beforeEach(async () => {
    selectedCollaboratorHolidaysSignal = signal<CollaboratorDetails | undefined>(undefined);
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', [], {
      selectedCollaboratorHoliday: selectedCollaboratorHolidaysSignal
    });
    mockCollabotadorDataService = jasmine.createSpyObj('CollaboratorDataService', ['getCollaboratorHolidays']);
    await TestBed.configureTestingModule({
      imports: [CollaboratorHolidaysComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorHolidaysComponent);
    component = fixture.componentInstance;

    collaboratorHolidays = [
        {
          initDate: new Date("2020-01-01"),
          finalDate: new Date("2020-01-10")
        },
        {
          initDate: new Date("2020-12-01"),
          finalDate: new Date("2020-12-10")
        }
      ];

    mockCollabotadorDataService.getCollaboratorHolidays.and.returnValue(collaboratorHolidays);

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
