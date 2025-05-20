import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { CollaboratorDetailsComponent } from "./collaborator-details/collaborator-details.component";
import { CollaboratorSignalService } from './collaborator-signal.service';
import { CollaboratorListComponent } from "./collaborator-list/collaborator-list.component";
import { CollaboratorsBulletsComponent } from "./collaborators-bullets/collaborators-bullets.component";

@Component({
  selector: 'app-collaborators',
  imports: [CollaboratorDetailsComponent, CollaboratorListComponent, CollaboratorsBulletsComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  selectedCollaborator = this.collaboratorSignalService.selectedCollaborator;
}
