import { TestBed } from '@angular/core/testing';

import { AssociationTrainingmoduleCollaboratorSignalService } from './association-trainingmodule-collaborator-signal.service';
import { AssociationTrainingModuleCollaborators } from '../models/association-trainingmodule-collaborator.model';

describe('AssociationTrainingmoduleCollaboratorSignalService', () => {
  let service: AssociationTrainingmoduleCollaboratorSignalService;

  const mockAssociation: AssociationTrainingModuleCollaborators = {
    id: '1',
    trainingModuleId: 'tm1',
    collaboratorId: 'c1',
    periodDate: {
      initDate: new Date('2024-01-01'),
      finalDate: new Date('2024-12-31')
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociationTrainingmoduleCollaboratorSignalService);
  });

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy();
  });
  it('should have initial isCreatingAssociationTMC as false', () => {
    // Assert
    expect(service.isCreatingAssociationTMC()).toBeFalse();
  });

  it('should have initial createdAssociationTMC as undefined', () => {
    // Assert
    expect(service.createdAssociationTMC()).toBeUndefined();
  });

  it('should change creation state to true', () => {
    // Act
    service.changeAssociationTMCCreationState(true);

    // Assert
    expect(service.isCreatingAssociationTMC()).toBeTrue();
  });

  it('should change creation state to false', () => {
    // Act
    service.changeAssociationTMCCreationState(false);

    // Assert
    expect(service.isCreatingAssociationTMC()).toBeFalse();
  });

  it('should set created association', () => {
    // Act
    service.createAssociationTMC(mockAssociation);

    // Assert
    expect(service.createdAssociationTMC()).toEqual(mockAssociation);
  });

  it('should set created association to undefined', () => {
    // Act
    service.createAssociationTMC(undefined);

    // Assert
    expect(service.createdAssociationTMC()).toBeUndefined();
  });
});
