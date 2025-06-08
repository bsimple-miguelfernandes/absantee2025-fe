import { Component, effect, inject, input } from '@angular/core';
import { ProjectsSignalsService } from '../projects/projects-signals.service';
import { ProjectsDataService } from '../projects/projects-data.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CollaboratorSignalService } from '../collaborators/collaborator-signal.service';
import { CollaboratorDetailsComponent } from "../collaborators/collaborator-details/collaborator-details.component";
import { ProjectComponent } from "../projects/project/project.component";
import { DatePipe } from '@angular/common';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { AddCollaboratorProjectComponent } from "./add-collaborator-project/add-collaborator-project.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-associations-project-collaborator',
  imports: [ProjectComponent, DatePipe, AddCollaboratorProjectComponent, RouterOutlet],
  templateUrl: './associations-project-collaborator.component.html',
  styleUrl: './associations-project-collaborator.component.css'
})
export class AssociationsProjectCollaboratorComponent {
  collaboratorId = input<string | undefined>(undefined);
  projectId = input<string | undefined>(undefined);

  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;
  isCreatingAssocProjCollabSignal = this.projectSignalService.isCreatingAssociation;

  projectsDataService = inject(ProjectsDataService);
  associations!: AssociationProjectCollaborators[];

  collaboratorDataService = inject(CollaboratorDataService);

  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorSelected = this.collaboratorSignalService.selectedCollaborator;
  collaboratorProjectsSelected = this.collaboratorSignalService.selectedCollaboratorProjects;
  isCreatingAssocCollabProjSignal = this.collaboratorSignalService.isCreatingAssociation;

  constructor() {
    effect(() => {
      if (this.projectId()) {
        //reset the selected collaborator
        this.collaboratorSignalService.selectCollaborator(undefined);
        this.projectsDataService.getAssociations(this.projectId()!).subscribe((associations => {
          this.associations = associations
        }))
      }
      if (this.collaboratorId()) {
        //reset the selected project
        this.projectSignalService.selectProject(undefined);
        this.collaboratorDataService.getAssociations(this.collaboratorId()!).subscribe((associations) => {
          this.associations = associations;
        });
      }
    });

    effect(() => {
      const assocCollabProjCreated = this.collaboratorSignalService.createdAssociation();

      if (assocCollabProjCreated) {
        this.associations = [...this.associations, assocCollabProjCreated];
      }
    });

    effect(() => {
      const assocProjCollabCreated = this.projectSignalService.createdAssociation();

      if (assocProjCollabCreated) {
        this.associations = [...this.associations, assocProjCollabCreated];
      }
    });
  }

  onSelectCollaboratorDetails(assoc: AssociationProjectCollaborators) {
    this.collaboratorDataService.getCollabById(assoc.collaboratorId).subscribe({
      next: (collab) => {
        this.collaboratorSignalService.selectCollaborator(collab);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSelectProjectDetails(assoc: AssociationProjectCollaborators) {
    this.projectsDataService.getProjectById(assoc.projectId).subscribe((project) => {
      this.projectSignalService.selectProject(project);
    });
  }
}
