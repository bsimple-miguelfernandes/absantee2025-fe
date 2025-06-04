import { Injectable, signal } from '@angular/core';
import { Collaborator } from './collaborator';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';
<<<<<<< Updated upstream
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
=======
import { CollaboratorViewModel } from './collaborator-details/collaborator.viewmodel';
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class CollaboratorSignalService {
  //private httpClient = inject(HttpClient);

  private updateCollaboratorSignal = signal<CollaboratorViewModel | undefined>(undefined);
  readonly updatedCollaborator = this.updateCollaboratorSignal.asReadonly();

  private selectedCollaboratorSignal = signal<CollaboratorViewModel | undefined>(undefined);
  readonly selectedCollaborator = this.selectedCollaboratorSignal.asReadonly();

  private selectedCollaboratorHolidaysSignal = signal<CollaboratorViewModel | undefined>(undefined);
  readonly selectedCollaboratorHoliday = this.selectedCollaboratorHolidaysSignal.asReadonly();

  private selectedCollaboratorProjectsSignal = signal<CollaboratorViewModel | undefined>(undefined);
  readonly selectedCollaboratorProjects = this.selectedCollaboratorProjectsSignal.asReadonly();

  private isCreatingCollaboratorSignal = signal(false);
  readonly isCreatingCollaborator = this.isCreatingCollaboratorSignal.asReadonly();
<<<<<<< Updated upstream

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
=======
  
  private createdCollaboratorSignal = signal<CollaboratorViewModel   | undefined>(undefined);
  readonly createdCollaborator = this.createdCollaboratorSignal.asReadonly();

  updateCollaborator(updated: CollaboratorViewModel ) {
>>>>>>> Stashed changes
    this.updateCollaboratorSignal.set(updated);
  }

  startCreateCollaborator() {
    this.isCreatingCollaboratorSignal.set(true);
  }

  createCollaborator(create: CollaboratorViewModel ) {
    this.createdCollaboratorSignal.set(create)
  }

  cancelCreateCollaborator() {
    this.isCreatingCollaboratorSignal.set(false);
  }

<<<<<<< Updated upstream
  selectCollaborator(selected: Collaborator | undefined) {
=======
  selectCollaborator(selected: CollaboratorViewModel  | undefined){
>>>>>>> Stashed changes
    this.selectedCollaboratorHolidaysSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(undefined);
    this.selectedCollaboratorSignal.set(selected);
  }

<<<<<<< Updated upstream
  selectCollaboratorHolidays(selected: Collaborator | undefined) {
=======
  selectCollaboratorHolidays(selected: CollaboratorViewModel  | undefined){
>>>>>>> Stashed changes
    this.selectedCollaboratorSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(undefined);
    this.selectedCollaboratorHolidaysSignal.set(selected);
  }

<<<<<<< Updated upstream
  selectCollaboratorProjects(selected: Collaborator | undefined) {
=======
  selectCollaboratorProjects(selected: CollaboratorViewModel  | undefined){
>>>>>>> Stashed changes
    this.selectedCollaboratorSignal.set(undefined);
    this.selectedCollaboratorHolidaysSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(selected);
  }
}
