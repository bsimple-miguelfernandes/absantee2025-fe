import { Component, effect, inject, input } from '@angular/core';
import { ProjectsSignalsService } from '../projects/projects-signals.service';
import { ProjectsDataService } from '../projects/projects-data.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CollaboratorSignalService } from '../collaborators/collaborator-signal.service';
import { CollaboratorDetailsComponent } from "../collaborators/collaborator-details/collaborator-details.component";
import { ProjectComponent } from "../projects/project/project.component";
import { DatePipe } from '@angular/common';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { AssociationsProjectCollaboratorDataService } from './associations-project-collaborator-data.service';
import { Project } from '../projects/project/project';

@Component({
  selector: 'app-associations-project-collaborator',
  imports: [CollaboratorDetailsComponent, ProjectComponent, DatePipe],
  templateUrl: './associations-project-collaborator.component.html',
  styleUrl: './associations-project-collaborator.component.css'
})
export class AssociationsProjectCollaboratorComponent {
  collaboratorId = input<string | undefined>(undefined);
  projectId = input<string | undefined>(undefined);

  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;

  associationDataService = inject(AssociationsProjectCollaboratorDataService);

  projectsDataService = inject(ProjectsDataService);
  projectCollaborators!: AssociationProjectCollaborators[];

  collaboratorDataService = inject(CollaboratorDataService);

  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorSelected = this.collaboratorSignalService.selectedCollaborator;
  collaboratorProjectsSelected = this.collaboratorSignalService.selectedCollaboratorProjects;

  constructor() {
    effect(() => {
      if (this.projectId()) {
        //reset the selected collaborator
        this.collaboratorSignalService.selectCollaborator(undefined);
        this.projectCollaborators = this.associationDataService.getProjectCollaborators(this.projectId()!);
      }
      if (this.collaboratorId()) {
        //reset the selected project
        this.projectSignalService.selectProject(undefined);
        this.projectCollaborators = this.associationDataService.getCollaboratorsOfProject(this.collaboratorId()!);
      }
    });
  }

  onSelectCollaboratorDetails(assoc: AssociationProjectCollaborators) {
    const collab = this.collaboratorDataService.getCollaboratorByEmail(assoc.collabEmail);
    this.collaboratorSignalService.selectCollaborator(collab);
  }

  onSelectProjectDetails(assoc: AssociationProjectCollaborators) {
    this.projectsDataService.getProjectById(assoc.projectId).subscribe((project) => {
      this.projectSignalService.selectProject(project);
    });
  }
}
