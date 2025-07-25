import { Injectable, signal } from '@angular/core';
import { AssociationTrainingModuleCollaborators } from '../models/association-trainingmodule-collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class AssociationTrainingmoduleCollaboratorSignalService {

  constructor() { }

  private isCreatingAssociationTMCSignal = signal<boolean>(false);
  readonly isCreatingAssociationTMC = this.isCreatingAssociationTMCSignal.asReadonly();

  private createdAssociationTMCSignal = signal<AssociationTrainingModuleCollaborators | undefined>(undefined);
  readonly createdAssociationTMC = this.createdAssociationTMCSignal.asReadonly();

  changeAssociationTMCCreationState(state: boolean) {
    this.isCreatingAssociationTMCSignal.set(state);
  }

  createAssociationTMC(assoc: AssociationTrainingModuleCollaborators | undefined) {
    this.createdAssociationTMCSignal.set(assoc);
  }
}
