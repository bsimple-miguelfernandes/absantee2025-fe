/* import { TestBed } from '@angular/core/testing';
import { ProjectsSignalsService } from './projects-signals.service';
import { ProjectViewModel } from './models/project-view-model.model';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';

describe('ProjectsSignalsService', () => {
  let service: ProjectsSignalsService;

  const mockProject: ProjectViewModel = {
    id: '1',
    title: 'Test Project',
    acronym: 'TP',
    periodDate: {
      initDate: new Date(),
      finalDate: new Date()
    }
  };

  const mockAssociation: AssociationProjectCollaborators = {
    id: '1',
    projectId: '1',
    projectAcronym: 'TM',
    collaboratorId: '1',
    collaboratorEmail: 'tm@email.com',
    periodDate: {
      initDate: new Date(),
      finalDate: new Date()
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set createdAssociationSignal when calling createAssociation', () => {
    // Act
    service.createAssociation(mockAssociation);

    // Assert
    expect(service.createdAssociation()).toEqual(mockAssociation);
  });

  it('should set isCreatingAssociationSignal when calling startCreateAssociation', () => {
    // Act
    service.startCreateAssociation();

    // Assert
    expect(service.isCreatingAssociation()).toBeTrue();
  });

  it('should set isCreatingAssociationSignal to false when calling cancelCreateAssociation', () => {
    // Act
    service.cancelCreateAssociation();

    // Assert
    expect(service.isCreatingAssociation()).toBeFalse();
  });


  it('should set projectCreatedSignal to the project when calling createProject', () => {
    // Act
    service.createProject(mockProject);

    // Assert
    expect(service.projectCreated()).toEqual(mockProject);
  });

  it('should set projectCreatedSignal to project and call cancelCreateProject when calling saveProject', () => {
    // Act
    service.saveProject(mockProject);

    // Assert
    expect(service.projectCreated()).toEqual(mockProject);
  });

  it('should set projectUpdatedSignal to project and call cancelEditProject when calling updateProject', () => {
    // Act
    service.updateProject(mockProject);

    // Assert
    expect(service.projectUpdated()).toEqual(mockProject);
  });
});
 */