import { Component, effect, inject, input } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { CollaboratorDataService } from '../collaborator-data.service';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';
import { Collaborator } from '../collaborator';

@Component({
  selector: 'app-collaborators-bullets',
  imports: [],
  templateUrl: './collaborators-bullets.component.html',
  styleUrl: './collaborators-bullets.component.css'
})
export class CollaboratorsBulletsComponent {
  collaborators = input.required<Collaborator[]>();

  collaboratorSignalService = inject(CollaboratorSignalService);

  onSelectCollaborator(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaborator(collaborator);
  }
}
