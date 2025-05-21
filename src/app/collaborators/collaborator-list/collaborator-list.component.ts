import { Component, computed, effect, inject, input, output } from '@angular/core';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';

@Component({
  selector: 'app-collaborator-list',
  imports: [],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
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

  onSelectCollaboratorHolidays(collaborator: CollaboratorDetails){
    this.collaboratorSignalService.selectCollaboratorHolidays(collaborator);
  }
}
