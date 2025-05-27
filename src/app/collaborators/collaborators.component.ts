import { Component, effect, inject } from '@angular/core';
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

@Component({
  selector: 'app-collaborators',
  standalone: true, 
  imports: [
    CommonModule,
    CollaboratorDetailsComponent,
    CollaboratorListComponent,
    CollaboratorsBulletsComponent,
    CollaboratorHolidaysComponent,
    AssociationsProjectCollaboratorComponent,
    CollaboratorCreateComponent
  ],
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']  
})
export class CollaboratorsComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorDataService = inject(CollaboratorDataService);

  selectedCollaborator = this.collaboratorSignalService.selectedCollaborator;
  collaboratorUpdated = this.collaboratorSignalService.updatedCollaborator;
  selectedCollaboratorHolidays = this.collaboratorSignalService.selectedCollaboratorHoliday;
  selectedCollaboratorProject = this.collaboratorSignalService.selectedCollaboratorProjects;

  collaborators: Collaborator[] = [];

  constructor() {
    this.loadCollaborators();

    this.collaboratorSignalService.selectCollaborator(undefined);
    this.collaboratorSignalService.selectCollaboratorHolidays(undefined);

    effect(() => {
      const updated = this.collaboratorUpdated();
      if (updated) {
        this.collaboratorDataService.updateCollaborator(updated).subscribe({
          next: () => this.loadCollaborators(),
          error: (err) => console.error('Erro ao atualizar colaborador:', err)
        });
      }
    });
  }

  loadCollaborators() {
    this.collaboratorDataService.getCollabs().subscribe((collaborators) => {
      this.collaborators = collaborators;
    });
  }

  startCreate() {
    this.collaboratorSignalService.startCreateCollaborator();
  }
}