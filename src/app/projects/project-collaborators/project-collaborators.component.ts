import { Component, effect, inject } from '@angular/core';
import { ProjectsDataService } from '../projects-data.service';
import { ProjectService } from '../project.service';
import { ProjectsSignalsService } from '../projects-signals.service';
import { CollaboratorDetails } from '../../collaborators/collaborator-details/collaborator-details';

@Component({
  selector: 'app-project-collaborators',
  imports: [],
  templateUrl: './project-collaborators.component.html',
  styleUrl: './project-collaborators.component.css'
})
export class ProjectCollaboratorsComponent {
  projectSignalService = inject(ProjectsSignalsService);
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;

  projectsDataService = inject(ProjectsDataService);
  projectCollaborators! : CollaboratorDetails[];

  constructor(){
    effect(() => {
      this.projectCollaborators = this.projectsDataService.getProjectCollaborators(this.projectCollaboratorsSelected()!.id);
    });
  }
}
