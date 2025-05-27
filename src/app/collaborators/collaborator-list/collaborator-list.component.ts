import { Component, computed, effect, inject, input, output } from '@angular/core';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { Collaborator } from '../collaborator';

@Component({
  selector: 'app-collaborator-list',
  imports: [],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaborators = input.required<Collaborator[]>();

  onSelectCollaborator(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaborator(collaborator);
  }

  onSelectCollaboratorHolidays(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaboratorHolidays(collaborator);
  }

  onSelectCollaboratorProjects(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaboratorProjects(collaborator);
  }
}
