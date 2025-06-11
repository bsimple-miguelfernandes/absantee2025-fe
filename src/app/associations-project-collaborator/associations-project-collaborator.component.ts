import { Component, inject } from '@angular/core';
import { ProjectsDataService } from '../projects/projects-data.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { DatePipe } from '@angular/common';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { AddCollaboratorProjectComponent } from "./add-collaborator-project/add-collaborator-project.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-associations-project-collaborator',
  imports: [DatePipe, AddCollaboratorProjectComponent],
  templateUrl: './associations-project-collaborator.component.html',
  styleUrl: './associations-project-collaborator.component.css'
})
export class AssociationsProjectCollaboratorComponent {
  collaboratorDataService = inject(CollaboratorDataService);
  projectsDataService = inject(ProjectsDataService);
  associations!: AssociationProjectCollaborators[];

  selectedId!: string;
  isInProject!: boolean;

  constructor(private route: ActivatedRoute) {
    this.selectedId = this.route.snapshot.paramMap.get("selectedId")!;
    this.isInProject = this.route.parent!.snapshot.toString().includes("projects");
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.associations = data["AssociationData"]
    });
  }
}
