import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ProjectsDataService } from '../projects-data.service';
import { ProjectService } from '../project.service';
import { ProjectsSignalsService } from '../projects-signals.service';
import { CollaboratorDetails } from '../../collaborators/collaborator-details/collaborator-details';
import { ProjectCollaborators } from '../project/project';
import { DatePipe } from '@angular/common';
import { CollaboratorDataService } from '../../collaborators/collaborator-data.service';
import { CollaboratorSignalService } from '../../collaborators/collaborator-signal.service';
import { CollaboratorDetailsComponent } from "../../collaborators/collaborator-details/collaborator-details.component";

@Component({
  selector: 'app-project-collaborators',
  imports: [DatePipe, CollaboratorDetailsComponent],
  templateUrl: './project-collaborators.component.html',
  styleUrl: './project-collaborators.component.css'
})
export class ProjectCollaboratorsComponent implements OnDestroy{
  projectSignalService = inject(ProjectsSignalsService);
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;

  projectsDataService = inject(ProjectsDataService);
  projectCollaborators! : ProjectCollaborators[];

  collaboratorDataService = inject(CollaboratorDataService);

  collaboratorSignalService = inject(CollaboratorSignalService);
  collaboratorSelected = this.collaboratorSignalService.selectedCollaborator;

  constructor(){
    effect(() => {
      //reset the selected collaborator
      this.collaboratorSignalService.selectCollaborator(undefined);
      this.projectCollaborators = this.projectsDataService.getProjectCollaborators(this.projectCollaboratorsSelected()!.id);
    });
  }
  
  ngOnDestroy(): void {
    this.collaboratorSignalService.selectCollaborator(undefined);
  }

  onSelectCollaboratorDetails(assoc : ProjectCollaborators){
    const collab = this.collaboratorDataService.getCollaboratorByEmail(assoc.collabEmail);
    this.collaboratorSignalService.selectCollaborator(collab);
  }
}
