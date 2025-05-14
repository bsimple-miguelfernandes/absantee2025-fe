import { Component, input, output } from '@angular/core';
import { CollaboratorDetails } from '../collaborator-details/collaborator-details';

@Component({
  selector: 'app-collaborator-list',
  imports: [],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaborators = input.required<CollaboratorDetails[]>();
  selectedCollaborator = output<CollaboratorDetails>();

  onSelectCollaborator(collaborator: CollaboratorDetails){
    this.selectedCollaborator.emit(collaborator);
  }
}
