/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { signal, WritableSignal } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CollaboratorDataService } from '../collaborator-data.service';
import { of } from 'rxjs';
import { CollaboratorViewModel } from './collaborator.viewmodel';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let collaborator: CollaboratorViewModel ;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let mockCollaboratorDataService: jasmine.SpyObj<CollaboratorDataService>;

  beforeEach(async () => {
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['updateCollaborator', 'cancelCreateCollaborator']);
    mockCollaboratorDataService = jasmine.createSpyObj('CollaboratorDataService',  ['updateCollaborator']);

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

    await TestBed.configureTestingModule({
      imports: [CollaboratorDetailsComponent],
      providers: [
        { provide: CollaboratorSignalService, useValue: mockCollaboratorSignalService },
        { provide: CollaboratorDataService, useValue: mockCollaboratorDataService },
        { provide: MAT_DIALOG_DATA, useValue: { collab: collaborator } },
        { provide: MatDialogRef, useValue: {} },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorDetailsComponent);
    component = fixture.componentInstance;

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

  // this test doesnt make sense while collab details is a dialogbox, since the collab doesn't change in it's lifespan
  it('should update form inputs when collaborator input changes', async () => {
    const newCollaborator : CollaboratorViewModel  = {
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

  it('should call updateCollaborator when form is submitted', () => {
    const emailControl = component.form.get('email')!;
    emailControl.setValue('email-changed@test.com');
    emailControl.markAsDirty();

    const updatedCollaborator = collaborator;
    updatedCollaborator.email = 'email-changed@test.com';

    mockCollaboratorDataService.updateCollaborator.and.returnValue(of(updatedCollaborator));
    component.onSubmit();

    expect(mockCollaboratorSignalService.updateCollaborator).toHaveBeenCalledOnceWith(updatedCollaborator);
    expect(mockCollaboratorSignalService.cancelCreateCollaborator).toHaveBeenCalledOnceWith();
  });

  it('should call updateCollaborator with form data', async () => {
    const newCollaborator : CollaboratorViewModel  = {
      collabId: "1",
      userId: '1',
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

    component.form.patchValue(newCollaborator);
    component.form.markAsDirty();
    fixture.detectChanges();
    await fixture.whenStable();

    mockCollaboratorDataService.updateCollaborator.and.returnValue(of(newCollaborator));
    component.onSubmit();

    expect(mockCollaboratorDataService.updateCollaborator).toHaveBeenCalledWith(jasmine.objectContaining({
      names: 'Bob',
      surnames: 'Martinez',
      email: 'bob.martinez@example.com',
      userPeriod: {
        _initDate: new Date('2020-01-01'),
        _finalDate: new Date('2025-12-31'),
      },
      collaboratorPeriod: {
        _initDate: new Date('2020-02-01'),
        _finalDate: new Date('2024-11-30'),
      }
    }));
  });

  it('should not make any calls if form isn\'t dirty', () => {
    const emailControl = component.form.get('email')!;
    emailControl.setValue('email-changed@test.com');

    const updatedCollaborator = collaborator;
    updatedCollaborator.email = 'email-changed@test.com';

    mockCollaboratorDataService.updateCollaborator.and.returnValue(of(updatedCollaborator));
    component.onSubmit();

    expect(mockCollaboratorSignalService.updateCollaborator).toHaveBeenCalledTimes(0);
    expect(mockCollaboratorSignalService.cancelCreateCollaborator).toHaveBeenCalledTimes(0);
  });
});
 */