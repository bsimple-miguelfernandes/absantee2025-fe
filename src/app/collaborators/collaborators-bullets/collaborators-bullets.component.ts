import { Component, effect, inject } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';

@Component({
  selector: 'app-collaborators-bullets',
  imports: [],
  templateUrl: './collaborators-bullets.component.html',
  styleUrl: './collaborators-bullets.component.css'
})
export class CollaboratorsBulletsComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);
  collaborators = this.collaboratorDataService.collaborators;
  collaboratorUpdated = this.collaboratorSignalService.updatedCollaborator;

  constructor(){
    effect(() => {
      if(this.collaboratorUpdated()){
        this.collaboratorDataService.updateCollaborator(this.collaboratorUpdated()!)
      }
    });
  }

  onSelectCollaborator(collaborator: CollaboratorDetails){
    this.collaboratorSignalService.selectCollaborator(collaborator);
  }
}
