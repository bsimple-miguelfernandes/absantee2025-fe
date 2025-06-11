import { Component, effect, inject } from '@angular/core';
import { ProjectsSignalsService } from '../projects/projects-signals.service';
import { ProjectsDataService } from '../projects/projects-data.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CollaboratorSignalService } from '../collaborators/collaborator-signal.service';
import { DatePipe } from '@angular/common';
import { AddCollaboratorProjectComponent } from "./add-collaborator-project/add-collaborator-project.component";
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Project } from '../projects/project/project.model';
import { CollaboratorViewModel } from '../collaborators/collaborator-details/collaborator.viewmodel';
import { toAssociationProjectCollaboratorViewModel } from './mappers/association-project-collaborator.mapper';
import { AssociationProjectCollaboratorsViewModel } from './association-project-collaborator.viewmodel';

@Component({
  selector: 'app-associations-project-collaborator',
  imports: [DatePipe, AddCollaboratorProjectComponent, RouterOutlet, RouterLink],
  templateUrl: './associations-project-collaborator.component.html',
  styleUrl: './associations-project-collaborator.component.css'
})
export class AssociationsProjectCollaboratorComponent {
  route = inject(ActivatedRoute);
  projectSignalService = inject(ProjectsSignalsService);
  collaboratorSignalService = inject(CollaboratorSignalService);
  projectsDataService = inject(ProjectsDataService);
  collaboratorDataService = inject(CollaboratorDataService);

  associations: AssociationProjectCollaboratorsViewModel[] = [];

  projectSelected!: Project;
  isCreatingAssocProjCollabSignal = this.projectSignalService.isCreatingAssociation;

  collaboratorSelected!: CollaboratorViewModel;
  isCreatingAssocCollabProjSignal = this.collaboratorSignalService.isCreatingAssociation;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['project']) {
        const project = data['project'];
        this.projectSelected = project;
        this.projectsDataService.getAssociations(project.id).subscribe(assocs => {
          this.associations = assocs.map(a => toAssociationProjectCollaboratorViewModel(a));
        });
      }

      if (data['collaborator']) {
        const collaborator = data['collaborator'];
        this.collaboratorSelected = collaborator;
        this.collaboratorDataService.getAssociations(collaborator.collabId).subscribe(assocs => {
          this.associations = assocs.map(a => toAssociationProjectCollaboratorViewModel(a));
        });
      }
    });
  }

  constructor() {
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

}
