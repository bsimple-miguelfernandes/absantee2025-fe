import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CollaboratorCreateComponent } from './collaborator-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { of, throwError } from 'rxjs';

describe('CollaboratorCreateComponent', () => {
  let component: CollaboratorCreateComponent;
  let fixture: ComponentFixture<CollaboratorCreateComponent>;
  let mockDataService: jasmine.SpyObj<CollaboratorDataService>;
  let mockSignalService: jasmine.SpyObj<CollaboratorSignalService>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('CollaboratorDataService', ['createCollaborator']);
    mockSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['cancelCreateCollaborator']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CollaboratorCreateComponent],  
      providers: [
        { provide: CollaboratorDataService, useValue: mockDataService },
        { provide: CollaboratorSignalService, useValue: mockSignalService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const today = new Date().toISOString().split('T')[0];
    const formValue = component.form.getRawValue();

    expect(formValue.deactivationDate).toBe(today);
    expect(formValue.collaboratorPeriod.initDate).toBe(today);
    expect(formValue.collaboratorPeriod.finalDate).toBe(today);
  });

  it('should call createCollaborator with correct data on submit', fakeAsync(() => {
    const today = new Date();
    const mockResponse = {
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com',
      deactivationDate: today,
      periodDateTime: {
        _initDate: today,
        _finalDate: today
      }
    };

    // Preenche o formulário antes de submeter
    component.form.setValue({
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com',
      deactivationDate: today.toISOString().split('T')[0],
      collaboratorPeriod: {
        initDate: today.toISOString().split('T')[0],
        finalDate: today.toISOString().split('T')[0]
      }
    });

    mockDataService.createCollaborator.and.returnValue(of(mockResponse));

    component.onSubmit();
    tick();

    expect(mockDataService.createCollaborator).toHaveBeenCalledWith(jasmine.objectContaining({
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com'
    }));
    expect(mockSignalService.cancelCreateCollaborator).toHaveBeenCalled();
    expect(component.form.pristine).toBeTrue();
  }));

  it('should handle error from createCollaborator', fakeAsync(() => {
    component.form.patchValue({
      names: 'Error',
      surnames: 'Test',
      email: 'error@example.com',
      deactivationDate: new Date().toISOString().split('T')[0],
      collaboratorPeriod: {
        initDate: new Date().toISOString().split('T')[0],
        finalDate: new Date().toISOString().split('T')[0],
      }
    });

    mockDataService.createCollaborator.and.returnValue(throwError(() => new Error('API error')));

    spyOn(console, 'error');
    component.onSubmit();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error creating collaborator:', jasmine.any(Error));
  }));

  it('should reset form and call cancel on cancel', () => {
    spyOn(component.form, 'reset');
    component.onCancel();

    expect(component.form.reset).toHaveBeenCalled();
    expect(mockSignalService.cancelCreateCollaborator).toHaveBeenCalled();
  });
});
