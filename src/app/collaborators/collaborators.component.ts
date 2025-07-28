import { Component, effect, inject, signal } from '@angular/core';
import { CollaboratorListComponent } from "./collaborator-list/collaborator-list.component";
import { CollaboratorDataService } from './collaborator-data.service';
import { CollaboratorCreateComponent } from './collaborators-create/collaborator-create.component';
import { CommonModule } from '@angular/common';
import { CollaboratorViewModel } from './collaborator-details/collaborator.viewmodel';
import { toCollaboratorViewModel } from './mappers/collaborator.mapper';
import { RouterOutlet } from '@angular/router';
import { Collaborator } from './collaborator';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { MatDialog } from '@angular/material/dialog';
import { CollaboratorSignalService } from './collaborator-signal.service';

@Component({
  selector: 'app-collaborators',
  imports: [
    CommonModule,
    CollaboratorListComponent,
    RouterOutlet
  ],
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {
  collaborators = signal<CollaboratorViewModel[]>([]);

  constructor(private collaboratorDataService: CollaboratorDataService, private dialog: MatDialog, private collabSignalService: CollaboratorSignalService) {
    this.collaboratorDataService.getCollabs().subscribe(
      {
        next: (collaborators) => {
          const collabVM = collaborators.map(toCollaboratorViewModel);
          this.collaborators.set(collabVM);
        },
        error: (err) => {
          alert('Error loading collaborators');
          console.error('Error loading collaborators', err);
        }
      });

    effect(() => {
      const createdCollab = this.collabSignalService.createdCollaborator();
      const updatedCollab = this.collabSignalService.updatedCollaborator();

       if (createdCollab) {
    this.collaborators.update(currentCollabs => [
      ...currentCollabs,
      createdCollab
    ]);
  }

      if (updatedCollab) {
        this.collaborators.update(currentCollabs => {
          const index = currentCollabs.findIndex(c => c.collabId === updatedCollab.collabId);
          if (index !== -1) {
            currentCollabs[index] = updatedCollab;
          }
          return [...currentCollabs];
        });
      }
    });
  }

  openDetails(collab: Collaborator) {
    let collabDialog = this.dialog.open(CollaboratorDetailsComponent, {
      data: {
        collab: collab
      }
    });

    collabDialog.afterClosed().subscribe(res => {
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
    });
  }

  openCreate() {
    let collabDialog = this.dialog.open(CollaboratorCreateComponent);

    collabDialog.afterClosed().subscribe(res => {
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
    });
  }
}
