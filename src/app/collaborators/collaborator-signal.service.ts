import { Injectable, signal } from '@angular/core';
import { Collaborator } from './collaborator';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorSignalService {
  //private httpClient = inject(HttpClient);

  private updateCollaboratorSignal = signal<Collaborator | undefined>(undefined);
  readonly updatedCollaborator = this.updateCollaboratorSignal.asReadonly();

  private selectedCollaboratorSignal = signal<Collaborator | undefined>(undefined);
  readonly selectedCollaborator = this.selectedCollaboratorSignal.asReadonly();

  private selectedCollaboratorHolidaysSignal = signal<Collaborator | undefined>(undefined);
  readonly selectedCollaboratorHoliday = this.selectedCollaboratorHolidaysSignal.asReadonly();

  private selectedCollaboratorProjectsSignal = signal<Collaborator | undefined>(undefined);
  readonly selectedCollaboratorProjects = this.selectedCollaboratorProjectsSignal.asReadonly();

  private isCreatingCollaboratorSignal = signal(false);
  readonly isCreatingCollaborator = this.isCreatingCollaboratorSignal.asReadonly();

  private createdCollaboratorSignal = signal<Collaborator | undefined>(undefined);
  readonly createdCollaborator = this.createdCollaboratorSignal.asReadonly();

  private isCreatingAssociationSignal = signal(false);
  readonly isCreatingAssociation = this.isCreatingAssociationSignal.asReadonly();

  private createdAssociationSignal = signal<AssociationProjectCollaborators | undefined>(undefined);
  readonly createdAssociation = this.createdAssociationSignal.asReadonly();

  startCreateAssociation() {
    this.isCreatingAssociationSignal.set(true);
  }

  cancelCreateAssociation() {
    this.isCreatingAssociationSignal.set(false);
  }

  createAssociation(assoc: AssociationProjectCollaborators) {
    this.createdAssociationSignal.set(assoc);
  }

  updateCollaborator(updated: Collaborator) {
    this.updateCollaboratorSignal.set(updated);
  }

  startCreateCollaborator() {
    this.isCreatingCollaboratorSignal.set(true);
  }

  createCollaborator(create: Collaborator) {
    this.createdCollaboratorSignal.set(create)
  }

  cancelCreateCollaborator() {
    this.isCreatingCollaboratorSignal.set(false);
  }

  selectCollaborator(selected: Collaborator | undefined) {
    this.selectedCollaboratorHolidaysSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(undefined);
    this.selectedCollaboratorSignal.set(selected);
  }

  selectCollaboratorHolidays(selected: Collaborator | undefined) {
    this.selectedCollaboratorSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(undefined);
    this.selectedCollaboratorHolidaysSignal.set(selected);
  }

  selectCollaboratorProjects(selected: Collaborator | undefined) {
    this.selectedCollaboratorSignal.set(undefined);
    this.selectedCollaboratorHolidaysSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(selected);
  }
}
