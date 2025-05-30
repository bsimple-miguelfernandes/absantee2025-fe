import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorHolidaysComponent } from './collaborator-holidays.component';
import { DebugElement, signal, WritableSignal } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { HolidayPeriod } from './holiday-period';
import { of } from 'rxjs';
import { Collaborator } from '../collaborator';
import { By } from '@angular/platform-browser';

describe('CollaboratorHolidaysComponent', () => {
  let component: CollaboratorHolidaysComponent;
  let fixture: ComponentFixture<CollaboratorHolidaysComponent>;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedCollaboratorHolidaysSignal: WritableSignal<Collaborator | undefined>;
  let mockCollabotadorDataService: jasmine.SpyObj<CollaboratorDataService>;
  let collaborator: Collaborator;
  let collaboratorHolidays: HolidayPeriod[];

  beforeEach(async () => {
    selectedCollaboratorHolidaysSignal = signal<Collaborator | undefined>(undefined);
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', [], {
      selectedCollaboratorHoliday: selectedCollaboratorHolidaysSignal
    });
    mockCollabotadorDataService = jasmine.createSpyObj('CollaboratorDataService', [
      'getCollaboratorHolidays',
      'editHoliday',
      'addHoliday'
    ]);
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
      collabId: "1",
      userId: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      collaboratorPeriod: {
        _initDate: new Date("2019-06-10"),
        _finalDate: new Date("2025-12-31")
      },
      userPeriod: {
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

  //ui changes and actions
  it('should display the name and surname of selected collaborator', () => {
    const title = fixture.nativeElement.querySelector("h1").textContent;

    expect(title).toEqual(collaborator.names + " " + collaborator.surnames);
  });

  it('should show the Holidays Info in the table', () => {
    fixture.detectChanges();
    const inputs = fixture.debugElement.queryAll(By.css('input'));

    expect(inputs[0].nativeElement.value).toBe(collaboratorHolidays[0].periodDate.initDate);
    expect(inputs[1].nativeElement.value).toBe(collaboratorHolidays[0].periodDate.finalDate);

    expect(inputs[2].nativeElement.value).toBe(collaboratorHolidays[1].periodDate.initDate);
    expect(inputs[3].nativeElement.value).toBe(collaboratorHolidays[1].periodDate.finalDate);
  });

  it('when createEmptyHoliday is called a new element is added to the form', () => {
    const prevCount = component.form.controls.holidays.length;

    component.createEmptyHoliday();

    expect(component.form.controls.holidays.length).toBe(prevCount + 1);
  });

  it('when add button is clicked a new element is added to the form', () => {
    const prevCount = fixture.debugElement.queryAll(By.css('tr')).length;

    const button1: HTMLElement = fixture.nativeElement.querySelector('[data-testid="add-btn"]');
    button1.click();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(prevCount + 1);
  });

  it('added elements have a \'save\' button', () => {
    const button: HTMLElement = fixture.nativeElement.querySelector('[data-testid="add-btn"]');
    button.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('button')[2].textContent).toBe(' Save ');
  });

  //service calls
  it('should call dataService.editHoliday when edit button is pressed and form was altered', () => {
    component.form.markAsDirty();
    const button : HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(mockCollabotadorDataService.editHoliday).toHaveBeenCalled();
  });

  it('should call dataService.addHoliday when save button is pressed and form was altered', () => {
    component.form.markAsDirty();
    const button : HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();

    expect(mockCollabotadorDataService.editHoliday).toHaveBeenCalled();
  });
});
