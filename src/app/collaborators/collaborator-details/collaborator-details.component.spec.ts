import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { signal, WritableSignal } from '@angular/core';
import { Collaborator, UpdateCollab } from '../collaborator';
import { CollaboratorDataService } from '../collaborator-data.service';
import { of } from 'rxjs';
import { CollaboratorViewModel } from './collaborator.viewmodel';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fromCollaboratorViewModel } from '../mappers/collaborator.mapper';
import { User } from '../user';
import { By } from '@angular/platform-browser';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let mockCollaboratorSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let mockCollaboratorDataService: jasmine.SpyObj<CollaboratorDataService>;

  const collaborator: CollaboratorViewModel = {
    collabId: '1',
    userId: 'u1',
    names: 'João',
    surnames: 'Silva',
    email: 'joao@example.com',
    userPeriod: {
      _initDate: new Date('2020-01-01'),
      _finalDate: new Date('2025-12-31')
    },
    collaboratorPeriod: {
      _initDate: new Date('2020-02-01'),
      _finalDate: new Date('2024-11-30')
    }
  };

  beforeEach(async () => {
    mockCollaboratorSignalService = jasmine.createSpyObj('CollaboratorSignalService', [
      'updateCollaborator',
      'cancelCreateCollaborator'
    ]);
    mockCollaboratorDataService = jasmine.createSpyObj('CollaboratorDataService', [
      'updateCollaborator',
      'updateUser'
    ]);

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

  it('should initialize collaborator from MAT_DIALOG_DATA', () => {
    expect(component.collaborator).toEqual(collaborator);
  });

  it('should initialize form with correct values', () => {
    expect(component.form.value).toEqual({
      names: 'João',
      surnames: 'Silva',
      email: 'joao@example.com',
      userPeriodDateTime: {
        _initDate: '2020-01-01',
        _finalDate: '2025-12-31'
      },
      collaboratorPeriodDateTime: {
        _initDate: '2020-02-01',
        _finalDate: '2024-11-30'
      }
    });
  });

  it('should initialize form with collaborator data', () => {
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
    expect(userInitDateInput.value).toBe('2020-01-01');
    expect(userEndDateInput.value).toBe('2025-12-31');
    expect(collabInitDateInput.value).toBe('2020-02-01');
    expect(collabEndDateInput.value).toBe('2024-11-30');
  });

  it('should not submit if form is not dirty', () => {
    component.onSubmit();
    expect(mockCollaboratorDataService.updateUser).not.toHaveBeenCalled();
    expect(mockCollaboratorDataService.updateCollaborator).not.toHaveBeenCalled();
    expect(mockCollaboratorSignalService.updateCollaborator).not.toHaveBeenCalled();
    expect(mockCollaboratorSignalService.cancelCreateCollaborator).not.toHaveBeenCalled();
  });

  it('should call updateUser and updateCollaborator if form is dirty', () => {
    component.collaborator = collaborator;
    component.form.get('names')?.setValue('João Alterado');
    component.form.markAsDirty();
    spyOn(component, 'closeDialog');

    const formValue = component.form.value;

    const expectedUser: User = {
      id: collaborator.userId,
      names: formValue.names!,
      surnames: formValue.surnames!,
      email: formValue.email!,
      Period: {
        _initDate: new Date(formValue.userPeriodDateTime._initDate!),
        _finalDate: new Date(formValue.userPeriodDateTime._finalDate!)
      }
    };

    const expectedUpdateCollab: UpdateCollab = {
      Id: collaborator.collabId,
      PeriodDateTime: {
        _initDate: new Date(formValue.collaboratorPeriodDateTime._initDate!),
        _finalDate: new Date(formValue.collaboratorPeriodDateTime._finalDate!)
      }
    };

    mockCollaboratorDataService.updateUser.and.returnValue(of(expectedUser));
    mockCollaboratorDataService.updateCollaborator.and.returnValue(of(expectedUpdateCollab));

    component.onSubmit();

    expect(mockCollaboratorDataService.updateUser).toHaveBeenCalledWith(jasmine.objectContaining({
      userId: 'u1',
      names: 'João Alterado',
      surnames: 'Silva',
      email: 'joao@example.com',
      userPeriod: jasmine.objectContaining({
        _initDate: new Date('2020-01-01'),
        _finalDate: new Date('2025-12-31'),
      }),
      collabId: '1',
      collaboratorPeriod: jasmine.any(Object) 
    }));

    expect(mockCollaboratorDataService.updateCollaborator).toHaveBeenCalledWith(jasmine.objectContaining({
      collabId: expectedUpdateCollab.Id,
      collaboratorPeriod: expectedUpdateCollab.PeriodDateTime
    }));
    expect(mockCollaboratorSignalService.updateCollaborator).toHaveBeenCalledWith(jasmine.any(Object));
    expect(mockCollaboratorSignalService.cancelCreateCollaborator).toHaveBeenCalled();
    expect(component.form.pristine).toBeTrue();
    expect(component.closeDialog).toHaveBeenCalled();

  });

  it('should call closeDialog() when close button is clicked', () => {
    spyOn(component, 'closeDialog');

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.close-button');
    button.click();

    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should initialize the form with collaborator data', () => {
    const formValue = component.form.value;

    expect(formValue.names).toBe('João');
    expect(formValue.surnames).toBe('Silva');
    expect(formValue.email).toBe('joao@example.com');

    expect(formValue.userPeriodDateTime?._initDate).toBe('2020-01-01');
    expect(formValue.userPeriodDateTime?._finalDate).toBe('2025-12-31');

    expect(formValue.collaboratorPeriodDateTime?._initDate).toBe('2020-02-01');
    expect(formValue.collaboratorPeriodDateTime?._finalDate).toBe('2024-11-30');
  });

  it('should have a form in the DOM with correct controls', () => {
    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();

    const namesInput = form.querySelector('input[formControlName="names"]');
    const surnamesInput = form.querySelector('input[formControlName="surnames"]');
    const emailInput = form.querySelector('input[formControlName="email"]');

    expect(namesInput).toBeTruthy();
    expect(surnamesInput).toBeTruthy(); 
    expect(emailInput).toBeTruthy();

    const userInitDateInput = form.querySelector('div[formGroupName="userPeriodDateTime"] input[formControlName="_initDate"]');
    expect(userInitDateInput).toBeTruthy();
  });
});
