import { Component, effect, inject, input } from '@angular/core';
import { ProjectsSignalsService } from '../projects/services/projects-signals.service';
import { ProjectsDataService } from '../projects/services/projects-data.service';
import { CollaboratorDataService } from '../collaborators/services/collaborator-data.service';
import { CollaboratorSignalService } from '../collaborators/services/collaborator-signal.service';
import { DatePipe } from '@angular/common';
import { AddCollaboratorProjectComponent } from "./add-collaborator-project/add-collaborator-project.component";
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CollaboratorViewModel } from '../collaborators/collaborator-details/collaborator.viewmodel';
import { toAssociationProjectCollaboratorViewModel } from './mappers/association-project-collaborator.mapper';
import { AssociationProjectCollaboratorsViewModel } from './association-project-collaborator.viewmodel';
import { ProjectViewModel } from '../projects/project/project.viewmodel';

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

  project = input<ProjectViewModel>();
  isCreatingAssocProjCollabSignal = this.projectSignalService.isCreatingAssociation;

  collaborator = input<CollaboratorViewModel>();
  isCreatingAssocCollabProjSignal = this.collaboratorSignalService.isCreatingAssociation;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['project']) {
        const project = data['project'];
        this.projectsDataService.getAssociations(project.id).subscribe(assocs => {
          this.associations = assocs.map(a => toAssociationProjectCollaboratorViewModel(a));
        });
      }

      if (data['collaborator']) {
        const collaborator = data['collaborator'];
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
