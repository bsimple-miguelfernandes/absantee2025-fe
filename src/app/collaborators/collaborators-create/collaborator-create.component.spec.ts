// Importações necessárias para testar o componente e lidar com formulários reativos e chamadas assíncronas
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CollaboratorCreateComponent } from './collaborator-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { of, throwError } from 'rxjs';
import { Collaborator } from '../collaborator';
import { CollaboratorViewModel } from '../collaborator-details/collaborator.viewmodel';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('CollaboratorCreateComponent', () => {
  let component: CollaboratorCreateComponent;
  let fixture: ComponentFixture<CollaboratorCreateComponent>;
  let mockDataService: jasmine.SpyObj<CollaboratorDataService>;
  let mockSignalService: jasmine.SpyObj<CollaboratorSignalService>;
  let mockDialog: jasmine.SpyObj<MatDialogRef<CollaboratorCreateComponent, any>>;


  beforeEach(async () => {
    // Criação de versões "falsas" (spies) dos serviços com os métodos necessários espiados
    mockDataService = jasmine.createSpyObj('CollaboratorDataService', ['createCollaborator']);
    mockSignalService = jasmine.createSpyObj('CollaboratorSignalService', ['createCollaborator', 'cancelCreateCollaborator']);
    mockDialog = jasmine.createSpyObj('MatDialogRef<CollaboratorCreateComponent, any>', ['close']);

    // Configuração do ambiente de teste com o componente e suas dependências
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CollaboratorCreateComponent],  // Importa o módulo de formulários e o próprio componente
      providers: [
        { provide: CollaboratorDataService, useValue: mockDataService }, // Injeta o mock do serviço
        { provide: CollaboratorSignalService, useValue: mockSignalService }, // Injeta o mock do serviço
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialog }
      ]
    }).compileComponents();

    // Criação da instância do componente para ser usada nos testes
    fixture = TestBed.createComponent(CollaboratorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Atualiza o estado do componente
  });

  // verifica se o componente foi criado com sucesso
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Verifica se o formulário foi inicializado com as datas padrão (hoje)
  it('should initialize the form with default values', () => {
    const today = new Date().toISOString().split('T')[0];
    const formValue = component.form.getRawValue();

    expect(formValue.deactivationDate).toBe(today);
    expect(formValue.collaboratorPeriod.initDate).toBe(today);
    expect(formValue.collaboratorPeriod.finalDate).toBe(today);
  });

  // Testa o envio do formulário com valores válidos
  it('should call createCollaborator with correct data on submit', fakeAsync(() => {
    const today = new Date();
    const mockResponse : CollaboratorViewModel  = {
      collabId: '1',
      userId: '1',
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com',
      collaboratorPeriod: {
        _initDate: today,
        _finalDate: today
      },
      userPeriod: {
        _initDate: today,
        _finalDate: today
      }
    };

    // Preenche o formulário com dados de teste
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

    // Simula resposta bem-sucedida da API
    mockDataService.createCollaborator.and.returnValue(of(mockResponse));

    // Envia o formulário
    component.onSubmit();
    tick(); // Avança o tempo virtual para resolver a resposta assíncrona

    // Verificações: se o método foi chamado com os dados certos, se o cancelamento foi emitido e se o formulário foi resetado
    expect(mockDataService.createCollaborator).toHaveBeenCalledWith(jasmine.objectContaining({
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com'
    }));
    expect(mockSignalService.cancelCreateCollaborator).toHaveBeenCalled();
    expect(component.form.pristine).toBeTrue(); // Verifica se o formulário está "limpo"
  }));

  // Testa o comportamento ao ocorrer um erro ao criar colaborador
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

    // Simula erro da API
    mockDataService.createCollaborator.and.returnValue(throwError(() => new Error('API error')));

    // Espia o consola para verificar se o erro é logado
    spyOn(console, 'error');
    component.onSubmit();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error creating collaborator:', jasmine.any(Error));
  }));

  // Testa se o formulário é resetado e o cancelamento emitido ao cancelar
  it('should reset form and call cancel on cancel', () => {
    spyOn(component.form, 'reset'); // Espia o método reset do formulário
    component.onCancel();

    expect(component.form.reset).toHaveBeenCalled();
    expect(mockSignalService.cancelCreateCollaborator).toHaveBeenCalled();
  });

  it('should emit alert if required fields of collaborator are not filled in and dont request' , fakeAsync(() => {

     spyOn(window, 'alert');
      
     const today = new Date();
     
     component.form.setValue({
      names: '', //invalid input
      surnames: 'Doe',
      email: 'john.doe@example.com',
      deactivationDate: today.toISOString().split('T')[0],
      collaboratorPeriod: {
        initDate: today.toISOString().split('T')[0],
        finalDate: today.toISOString().split('T')[0]
      }
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Please fill all required fields.');
    expect(component.collaboratorDataService.createCollaborator).not.toHaveBeenCalled();
  }));

  it('should call dialog.close when cancel button is clicked', () => {
    const cancelButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    cancelButton.click();

    fixture.detectChanges();

    expect(mockDialog.close).toHaveBeenCalled();
  });

  it('should call dialog.close when submit button is clicked', async () => {
    const today = new Date();
    const collab = {
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com',
      deactivationDate: today.toISOString().split('T')[0],
      collaboratorPeriod: {
        initDate: today.toISOString().split('T')[0],
        finalDate: today.toISOString().split('T')[0]
      }
    };

    const collabResponse = {
      userId: '',
      collabId: '',
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com',
      deactivationDate: today.toISOString().split('T')[0],
      collaboratorPeriod: {
        _initDate: today,
        _finalDate: today
      },
      userPeriod: {
        _initDate: today,
        _finalDate: today
      }
    };

    component.form.setValue(collab);

    mockDataService.createCollaborator.and.returnValue(of(collabResponse));
    
    const submitButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    submitButton.click();

    expect(mockDialog.close).toHaveBeenCalled();
  });

  it('should call dialog.close when onSubmit is called', () => {
    const today = new Date();
    const collab = {
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com',
      deactivationDate: today.toISOString().split('T')[0],
      collaboratorPeriod: {
        initDate: today.toISOString().split('T')[0],
        finalDate: today.toISOString().split('T')[0]
      }
    };

    const collabResponse = {
      userId: '',
      collabId: '',
      names: 'John',
      surnames: 'Doe',
      email: 'john.doe@example.com',
      deactivationDate: today.toISOString().split('T')[0],
      collaboratorPeriod: {
        _initDate: today,
        _finalDate: today
      },
      userPeriod: {
        _initDate: today,
        _finalDate: today
      }
    };

    component.form.setValue(collab);

    mockDataService.createCollaborator.and.returnValue(of(collabResponse));

    component.onSubmit();

    fixture.detectChanges();

    expect(mockDialog.close).toHaveBeenCalled()
  });
});
