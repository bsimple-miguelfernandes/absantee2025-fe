import { Component, effect, inject, signal } from '@angular/core';
import { CollaboratorSignalService } from './collaborator-signal.service';
import { CollaboratorListComponent } from "./collaborator-list/collaborator-list.component";
import { CollaboratorDataService } from './collaborator-data.service';
import { CollaboratorCreateComponent } from './collaborators-create/collaborator-create.component';
import { CommonModule } from '@angular/common';
import { CollaboratorViewModel } from './collaborator-details/collaborator.viewmodel';
import { toCollaboratorViewModel } from './mappers/collaborator.mapper';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [
    CommonModule,
    CollaboratorListComponent,
    CollaboratorCreateComponent,
    RouterOutlet
  ],
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);

  createdCollaborator = this.collaboratorSignalService.createdCollaborator;
  collaboratorUpdated = this.collaboratorSignalService.updatedCollaborator;

  collaborators = signal<CollaboratorViewModel[]>([]);

  constructor() {
    this.collaboratorDataService.getCollabs().subscribe({
      next: (collaborators) => {
        const collabVM = collaborators.map(toCollaboratorViewModel)

        this.collaborators.set(collabVM);
      },
      error: (err) => {
        alert('Error loading collaborators');
        console.error('Error loading collaborators', err);
      }
    });

    effect(() => {
      const updated = this.collaboratorUpdated();
      if (updated) {
        this.collaborators.update(collabs =>
          collabs.map(c => c.collabId === updated.collabId ? updated : c)
        )
      }
    });

    effect(() => {
      const created = this.createdCollaborator();
      if (created) {
        this.collaborators.update(collabs => [...collabs, created]);
      }
    })
  }

  startCreate() {
    this.collaboratorSignalService.startCreateCollaborator();
  }
}