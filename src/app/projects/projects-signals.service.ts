import { Injectable, signal } from '@angular/core';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { ProjectViewModel } from './models/project-view-model.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsSignalsService {

  private projectCreatedSignal = signal<ProjectViewModel | undefined>(undefined);
  readonly projectCreated = this.projectCreatedSignal.asReadonly();

  private projectUpdatedSignal = signal<ProjectViewModel | undefined>(undefined);
  readonly projectUpdated = this.projectUpdatedSignal.asReadonly();

  private isCreatingAssociationSignal = signal(false);
  readonly isCreatingAssociation = this.isCreatingAssociationSignal.asReadonly();

  private createdAssociationSignal = signal<AssociationProjectCollaborators | undefined>(undefined);
  readonly createdAssociation = this.createdAssociationSignal.asReadonly();

  createAssociation(assoc: AssociationProjectCollaborators) {
    this.createdAssociationSignal.set(assoc);
  }

  startCreateAssociation() {
    this.isCreatingAssociationSignal.set(true);
  }

  cancelCreateAssociation() {
    this.isCreatingAssociationSignal.set(false);
  }

  createProject(projectCreated: ProjectViewModel) {
    this.projectCreatedSignal.set(projectCreated);
  }

  saveProject(project: ProjectViewModel) {
    this.projectCreatedSignal.set(project);
  }

  updateProject(project: ProjectViewModel) {
    this.projectUpdatedSignal.set(project);
  }
}
