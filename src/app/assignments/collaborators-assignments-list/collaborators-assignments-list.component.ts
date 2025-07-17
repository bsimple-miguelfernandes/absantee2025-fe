// collaborators-assignments-list.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorAssignmentsComponent } from '../collaborator-assignments/collaborator-assignments.component';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';

@Component({
  selector: 'app-collaborators-assignments-list',
  standalone: true,
  imports: [CommonModule, CollaboratorAssignmentsComponent],
  templateUrl: './collaborators-assignments-list.component.html'
})
export class CollaboratorsAssignmentsListComponent {
  private collaboratorService = inject(CollaboratorDataService);
  collaborators = signal<{ id: string, name: string, email: string }[]>([]);
  selectedCollaboratorId = signal<string | null>(null);

  constructor() {
    this.collaboratorService.getCollaborators().subscribe(collabs => {
      this.collaborators.set(collabs.map(c => ({
        id: c.collabId,
        name: `${c.names} ${c.surnames}`,
        email: c.email
      })));
    });
  }

  showAssignments(id: string) {
    this.selectedCollaboratorId.set(id);
  }
}
