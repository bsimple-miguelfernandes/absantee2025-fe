import { TestBed } from '@angular/core/testing';
import { AssociationTrainingmoduleCollaboratorService } from './association-trainingmodule-collaborator.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { AssociationTrainingModuleCollaboratorsDTO } from '../models/association-trainingmodule-collaborator.model';
import { AssociationTrainingModuleCollaboratorCreateRequest } from '../create-association-trainingmodule-collaborator/models/add-association-trainingmodule-collaborator.model';

describe('AssociationTrainingmoduleCollaboratorService', () => {
  let service: AssociationTrainingmoduleCollaboratorService;
  let httpMock: HttpTestingController;

  const baseCmdUrl = environment.associationTrainingModuleCollaboratorCMDBaseUrl;
  const baseQueryUrl = environment.associationTrainingModuleCollaboratorQUERYBaseUrl;

  const mockDto: AssociationTrainingModuleCollaboratorsDTO = {
    id: '123',
    trainingModuleId: 'tm1',
    collaboratorId: 'c1',
    periodDate: {
      initDate: new Date('2024-01-01'),
      finalDate: new Date('2024-12-31')
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AssociationTrainingmoduleCollaboratorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an association (POST)', () => {
    // Arrange
    const reqPayload: AssociationTrainingModuleCollaboratorCreateRequest = {
      collaboratorId: 'c1',
      trainingModuleId: 'tm1',
      periodDate: {
        initDate: new Date('2024-01-01'),
        finalDate: new Date('2024-12-31')
      }
    };

    // Act
    service.createAssociationTMC(reqPayload).subscribe((res) => {
      expect(res).toEqual(mockDto);
    });

    // Assert
    const req = httpMock.expectOne(`${baseCmdUrl}/associationsTMC`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      CollaboratorId: reqPayload.collaboratorId,
      TrainingModuleId: reqPayload.trainingModuleId,
      PeriodDate: reqPayload.periodDate
    });

    req.flush(mockDto);
  });

  it('should delete an association (DELETE)', () => {
    // Act & Assert
    service.removeAssociationTMC('123').subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseCmdUrl}/associationsTMC/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });

  it('should get associations by collaborator (GET)', () => {
    // Act & Assert
    service.getAssociationsByCollabTMC('c1').subscribe((res) => {
      expect(res).toEqual([mockDto]);
    });

    const req = httpMock.expectOne(`${baseQueryUrl}/associationsTMC/by-collaborator/c1`);
    expect(req.request.method).toBe('GET');
    req.flush([mockDto]);
  });

  it('should get associations by training module (GET)', () => {
    // Act & Assert
    service.getAssociationsByTrainingModuleTMC('tm1').subscribe((res) => {
      expect(res).toEqual([mockDto]);
    });

    const req = httpMock.expectOne(`${baseQueryUrl}/associationsTMC/by-trainingModule/tm1`);
    expect(req.request.method).toBe('GET');
    req.flush([mockDto]);
  });
});