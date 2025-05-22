import { Component, inject, OnDestroy } from '@angular/core';
import { CollaboratorDetailsComponent } from "./collaborator-details/collaborator-details.component";
import { CollaboratorSignalService } from './collaborator-signal.service';
import { CollaboratorListComponent } from "./collaborator-list/collaborator-list.component";
import { CollaboratorsBulletsComponent } from "./collaborators-bullets/collaborators-bullets.component";
import { CollaboratorHolidaysComponent } from "./collaborator-holidays/collaborator-holidays.component";

@Component({
  selector: 'app-collaborators',
  imports: [CollaboratorDetailsComponent, CollaboratorListComponent, CollaboratorsBulletsComponent, CollaboratorHolidaysComponent],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.css'
})
export class CollaboratorsComponent implements OnDestroy{
  collaboratorSignalService = inject(CollaboratorSignalService);
  selectedCollaborator = this.collaboratorSignalService.selectedCollaborator;

  selectedCollaboratorHolidays = this.collaboratorSignalService.selectedCollaboratorHoliday;

  ngOnDestroy(): void {
    this.collaboratorSignalService.selectCollaborator(undefined);
    this.collaboratorSignalService.selectCollaboratorHolidays(undefined);
  }
}
