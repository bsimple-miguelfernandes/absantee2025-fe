import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { CollaboratorDetailsComponent } from "./collaborator-details/collaborator-details.component";
import { CollaboratorService } from './collaborator.service';

@Component({
  selector: 'app-collaborators',
  imports: [CollaboratorDetailsComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent implements OnInit {
  collaborators = signal<CollaboratorDetails[]>([]);
  selectedCollaborator = signal<CollaboratorDetails | undefined>(undefined);
  collaboratorService = inject(CollaboratorService);

  ngOnInit(): void {
    this.collaborators.set(this.collaboratorService.getCollaborators());
  }
  onSelectCollaborator(collaborator: CollaboratorDetails) {
    this.selectedCollaborator.set(collaborator);
  }

  onChangeCollaborator(updated: CollaboratorDetails) {
  this.collaborators.update(collabs =>
    collabs.map(c => c.id === updated.id ? updated : c)
  );
}
}
