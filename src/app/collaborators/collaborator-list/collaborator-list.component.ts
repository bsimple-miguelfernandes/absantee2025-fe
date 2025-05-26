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
  collaborators = input.required<CollaboratorDetails[]>();

  onSelectCollaborator(collaborator: CollaboratorDetails){
    this.collaboratorSignalService.selectCollaborator(collaborator);
  }

  onSelectCollaboratorHolidays(collaborator: CollaboratorDetails){
    this.collaboratorSignalService.selectCollaboratorHolidays(collaborator);
  }

  onSelectCollaboratorProjects(collaborator: CollaboratorDetails){
    this.collaboratorSignalService.selectCollaboratorProjects(collaborator);
  }
}
