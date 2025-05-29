import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { signal, WritableSignal } from '@angular/core';
import { Collaborator } from '../collaborator';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let collaborator: Collaborator;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let selectedSignal: WritableSignal<Collaborator | undefined>;

  beforeEach(async () => {
    selectedSignal = signal<Collaborator | undefined>(undefined);
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['updateCollaborator'], {
      selectedCollaborator: selectedSignal
    });

    await TestBed.configureTestingModule({
      imports: [CollaboratorDetailsComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;

    collaborator = {
      collabId: "1",
      userId: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      //mockCollaboratorSignalService.selectedCollaborator.and.returnValue(collaborator);
      userPeriod: {
        _initDate: new Date('2020-01-01'),
        _finalDate: new Date('2025-12-31')
      },
      collaboratorPeriod: {
        _initDate: new Date('2020-02-01'),
        _finalDate: new Date('2024-11-30')
      }
    };

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
    const userInitDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#userInitDate');
    const userEndDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#userEndDate');
    const collabInitDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#collabInitDate');
    const collabEndDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#collabEndDate');

    expect(nameInput.value).toBe(collaborator.names);
    expect(surnamesInput.value).toBe(collaborator.surnames);
    expect(emailInput.value).toBe(collaborator.email);
    expect(userInitDateInput.value).toBe(collaborator.userPeriod._initDate.toISOString().split('T')[0]);
    expect(userEndDateInput.value).toBe(collaborator.userPeriod._finalDate.toISOString().split('T')[0]);
    expect(collabInitDateInput.value).toBe(collaborator.collaboratorPeriod._initDate.toISOString().split('T')[0]);
    expect(collabEndDateInput.value).toBe(collaborator.collaboratorPeriod._finalDate.toISOString().split('T')[0]);
  });

  it('should update form inputs when collaborator input changes', async () => {
    const newCollaborator : Collaborator = {
      collabId: "2",
      userId: '2',
      names: "Bob",
      surnames: "Martinez",
      email: "bob.martinez@example.com",
      userPeriod:{
        _initDate: new Date(2021, 1, 1),
        _finalDate: new Date(2024, 6, 30)
      },
      collaboratorPeriod: {
        _initDate: new Date(2021, 1, 1),
        _finalDate: new Date(2024, 6, 30)
      }
    };

    selectedSignal.set(newCollaborator);
    fixture.detectChanges();
    await fixture.whenStable();

    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector('#names');
    const surnamesInput: HTMLInputElement = fixture.nativeElement.querySelector('#surnames');
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    const userInitDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#userInitDate');
    const userEndDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#userEndDate');
    const collabInitDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#collabInitDate');
    const collabEndDateInput: HTMLInputElement = fixture.nativeElement.querySelector('#collabEndDate');

    expect(nameInput.value).toBe(newCollaborator.names);
    expect(surnamesInput.value).toBe(newCollaborator.surnames);
    expect(emailInput.value).toBe(newCollaborator.email);
    expect(userInitDateInput.value).toBe(newCollaborator.userPeriod._initDate.toISOString().split('T')[0]);
    expect(userEndDateInput.value).toBe(newCollaborator.userPeriod._finalDate.toISOString().split('T')[0]);
    expect(collabInitDateInput.value).toBe(newCollaborator.collaboratorPeriod._initDate.toISOString().split('T')[0]);
    expect(collabEndDateInput.value).toBe(newCollaborator.collaboratorPeriod._finalDate.toISOString().split('T')[0]);
  });

  /* it('should call updateCollaborator when form is submitted', () => {
    const updateCollaborator = collaborator;
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email');
    emailInput.value = 'email-changed@test.com';

    const button: HTMLElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(mockCollaboratorSignalService.updateCollaborator).toHaveBeenCalledOnceWith(updateCollaborator);
  }); */
});
