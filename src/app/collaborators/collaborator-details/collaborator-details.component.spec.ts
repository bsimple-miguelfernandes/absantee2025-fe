import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CollaboratorDetails } from './collaborator-details';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { Signal, signal, WritableSignal } from '@angular/core';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let collaborator: CollaboratorDetails;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedSignal: WritableSignal<CollaboratorDetails | undefined>;

  beforeEach(async () => {
    selectedSignal = signal<CollaboratorDetails | undefined>(undefined);
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['updateCollaborator'], {
      selectedCollaborator: selectedSignal
    });

    await TestBed.configureTestingModule({
      imports: [CollaboratorDetailsComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;

    collaborator =
    {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date('2019-06-10'),
        _finalDate: new Date('2025-11-31')
      }
    };

    //mockCollaboratorSignalService.selectedCollaborator.and.returnValue(collaborator);
    selectedSignal.set(collaborator);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have in form the values of selected collaborator', () => {
    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#names');
    const surnamesInput: HTMLInputElement = fixture.nativeElement.querySelector('#surnames');
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    const initDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#initDate');
    const endDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#endDate');

    expect(nameInput.value).toBe(collaborator.names);
    expect(surnamesInput.value).toBe(collaborator.surnames);
    expect(emailInput.value).toBe(collaborator.email);
    expect(initDateInput.value).toBe(collaborator.periodDateTime._initDate.toISOString().split('T')[0]);
    expect(endDateInput.value).toBe(collaborator.periodDateTime._finalDate.toISOString().split('T')[0]);
  });

  it('should update form inputs when collaborator input changes', () => {
    const newCollaborator : CollaboratorDetails = {
      id: "2",
      names: "Bob",
      surnames: "Martinez",
      email: "bob.martinez@example.com",
      periodDateTime: {
        _initDate: new Date(2021, 1, 1),
        _finalDate: new Date(2024, 6, 30)
      }
    };

    selectedSignal.set(newCollaborator);
    fixture.detectChanges();

    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#names');
    const surnamesInput: HTMLInputElement = fixture.nativeElement.querySelector('#surnames');
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    const initDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#initDate');
    const endDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#endDate');

    expect(nameInput.value).toEqual(newCollaborator.names);
    expect(surnamesInput.value).toEqual(newCollaborator.surnames);
    expect(emailInput.value).toEqual(newCollaborator.email);
    expect(initDateInput.value).toEqual(newCollaborator.periodDateTime._initDate.toISOString().split('T')[0]);
    expect(endDateInput.value).toEqual(newCollaborator.periodDateTime._finalDate.toISOString().split('T')[0]);
  });

  it('should call updateCollaborator when form is submitted', () => {
    const updateCollaborator = collaborator;
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'email-changed@test.com';

    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(mockCollaboratorSignalService.updateCollaborator).toHaveBeenCalledOnceWith(updateCollaborator);
  });
});
