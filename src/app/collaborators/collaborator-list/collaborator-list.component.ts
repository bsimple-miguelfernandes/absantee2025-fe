import { Component, inject, input } from '@angular/core';
import { CollaboratorSignalService } from '../collaborator-signal.service';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collaborator-list',
  imports: [CommonModule],
  templateUrl: './collaborator-list.component.html',
  styleUrl: './collaborator-list.component.css'
})
export class CollaboratorListComponent {
  collaboratorSignalService = inject(CollaboratorSignalService);
  collaborators = input.required<Collaborator[]>();

  onSelectCollaborator(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaborator(collaborator);
  }

  onSelectCollaboratorHolidays(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaboratorHolidays(collaborator);
  }

  onSelectCollaboratorProjects(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaboratorProjects(collaborator);
  }

  onSelectCollaboratorTrainingModules(collaborator: Collaborator){
    this.collaboratorSignalService.selectCollaboratorTrainingModules(collaborator);
  }
}
