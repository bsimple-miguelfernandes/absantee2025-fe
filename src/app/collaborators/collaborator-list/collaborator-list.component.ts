import { Component, inject, input } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { CollaboratorViewModel } from '../collaborator-details/collaborator.viewmodel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-collaborator-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaborators = input.required<Collaborator[]>();

  onSelectCollaborator(collaborator: CollaboratorViewModel ){
    this.collaboratorSignalService.selectCollaborator(collaborator);
  }

  onSelectCollaboratorHolidays(collaborator: CollaboratorViewModel ){
    this.collaboratorSignalService.selectCollaboratorHolidays(collaborator);
  }

  onSelectCollaboratorProjects(collaborator: CollaboratorViewModel ){
    this.collaboratorSignalService.selectCollaboratorProjects(collaborator);
  }

  onSelectCollaboratorTrainingModules(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaboratorTrainingModules(collaborator);
  }
}
