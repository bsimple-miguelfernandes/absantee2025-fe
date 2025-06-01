import { Component, inject , input, effect} from '@angular/core';
import { CollaboratorSignalService } from '../collaborators/collaborator-signal.service';
import { AssociationTrainingModuleCollaborator } from '../training-modules/association-training-module-collaborator';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-associations-training-module-collaborator',
  imports: [CommonModule],
  templateUrl: './associations-training-module-collaborator.component.html',
  styleUrl: './associations-training-module-collaborator.component.css'
})
export class AssociationsTrainingModuleCollaboratorComponent {
  collaboratorSignalService = inject(CollaboratorSignalService); 
  collaboratorDataService = inject(CollaboratorDataService); 

  collaboratorId = input<string | undefined>(undefined);
  trainingModuleId = input<string | undefined>(undefined);

  collaboratorModulesSelected = this.collaboratorSignalService.selectedCollaboratorTrainingModules;


  associations: AssociationTrainingModuleCollaborator[] = []

  constructor(){
    effect(() => {
    if(this.collaboratorId()){
    this.collaboratorDataService.getTrainingModuleAssociations(this.collaboratorId()!).subscribe({

      next: (associations => {
        this.associations = associations;
      }),
      error: (err => {
        console.error('Error loading training module associations.', err)
      })
    })
      
  }
 })
 }
}
