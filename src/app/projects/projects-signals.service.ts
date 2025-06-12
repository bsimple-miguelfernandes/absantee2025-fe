import { Injectable, signal } from '@angular/core';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { Project } from './models/project.model';
import { ProjectViewModel } from './models/project-view-model.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsSignalsService {
  private isCreatingProjectFormSignal = signal(false);
  readonly isCreatingProjectForm = this.isCreatingProjectFormSignal.asReadonly();

  private isEditingProjectFormSignal = signal<ProjectViewModel | undefined>(undefined);
  readonly isEditingProjectForm = this.isEditingProjectFormSignal.asReadonly();

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

  startCreateProject() {
    this.isCreatingProjectFormSignal.set(true);
    this.isEditingProjectFormSignal.set(undefined);
  }

  cancelCreateProject() {
    this.isCreatingProjectFormSignal.set(false);
  }

  startEditProject(project: Project) {
    this.isEditingProjectFormSignal.set(project)
    this.isCreatingProjectFormSignal.set(false);
  }

  cancelEditProject() {
    this.isEditingProjectFormSignal.set(undefined);
  }

  createProject(projectCreated: Project) {
    this.projectCreatedSignal.set(projectCreated);
  }

  saveProject(project: Project) {
    this.projectCreatedSignal.set(project);
    this.cancelCreateProject();
  }

  updateProject(project: Project) {
    this.projectUpdatedSignal.set(project);
    this.cancelEditProject();
  }
}
