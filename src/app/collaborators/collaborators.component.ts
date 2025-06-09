import { Component, effect, inject, signal } from '@angular/core';
import { CollaboratorDetailsComponent } from "./collaborator-details/collaborator-details.component";
import { CollaboratorSignalService } from './collaborator-signal.service';
import { CollaboratorListComponent } from "./collaborator-list/collaborator-list.component";
import { CollaboratorsBulletsComponent } from "./collaborators-bullets/collaborators-bullets.component";
import { CollaboratorHolidaysComponent } from "./collaborator-holidays/collaborator-holidays.component";
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";
import { CollaboratorDataService } from './collaborator-data.service';
import { Collaborator } from './collaborator';
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
    CollaboratorHolidaysComponent,
    AssociationsProjectCollaboratorComponent,
    CollaboratorCreateComponent,
    RouterOutlet
  ],
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent {
  collaboratorDataService = inject(CollaboratorDataService);

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
  }
}
