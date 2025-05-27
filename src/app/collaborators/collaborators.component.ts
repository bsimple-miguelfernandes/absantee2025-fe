import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { CollaboratorDetailsComponent } from "./collaborator-details/collaborator-details.component";
import { CollaboratorSignalService } from './collaborator-signal.service';
import { CollaboratorListComponent } from "./collaborator-list/collaborator-list.component";
import { CollaboratorsBulletsComponent } from "./collaborators-bullets/collaborators-bullets.component";
import { CollaboratorHolidaysComponent } from "./collaborator-holidays/collaborator-holidays.component";
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";
import { CollaboratorDataService } from './collaborator-data.service';
import { Collaborator } from './collaborator';

@Component({
  selector: 'app-collaborators',
  imports: [CollaboratorDetailsComponent, CollaboratorListComponent, CollaboratorsBulletsComponent, CollaboratorHolidaysComponent, AssociationsProjectCollaboratorComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  selectedCollaborator = this.collaboratorSignalService.selectedCollaborator;
  collaboratorUpdated = this.collaboratorSignalService.updatedCollaborator;
  selectedCollaboratorHolidays = this.collaboratorSignalService.selectedCollaboratorHoliday;
  selectedCollaboratorProject = this.collaboratorSignalService.selectedCollaboratorProjects;

  collaboratorDataService = inject(CollaboratorDataService);
  collaborators : Collaborator[] = [];

  constructor() {
    this.collaboratorDataService.getCollabs().subscribe((collaborators) => {
      this.collaborators = collaborators;
    })

    this.collaboratorSignalService.selectCollaborator(undefined);
    this.collaboratorSignalService.selectCollaboratorHolidays(undefined);

    effect(() => {
      const updated = this.collaboratorUpdated();
      if (updated) {
        this.collaboratorDataService.updateCollaborator(updated).subscribe({
          next: (resp) => {
            console.log('Colaborador atualizado:', resp);
          },
          error: (err) => {
            console.error('Erro ao atualizar colaborador:', err);
          }
        });
      }
    });
    
  }
}
