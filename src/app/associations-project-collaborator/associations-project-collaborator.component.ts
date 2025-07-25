import { Component, inject } from '@angular/core';
import { ProjectsDataService } from '../projects/projects-data.service';
import { CollaboratorDataService } from '../collaborators/collaborator-data.service';
import { CommonModule, DatePipe } from '@angular/common';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';
import { AddCollaboratorProjectComponent } from "./add-collaborator-project/add-collaborator-project.component";
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-associations-project-collaborator',
  imports: [DatePipe, RouterModule, CommonModule, AddCollaboratorProjectComponent],
  standalone: true,
  templateUrl: './associations-project-collaborator.component.html',
  styleUrl: './associations-project-collaborator.component.css'
})
export class AssociationsProjectCollaboratorComponent {
  collaboratorDataService = inject(CollaboratorDataService);
  projectsDataService = inject(ProjectsDataService);
  associations: AssociationProjectCollaborators[] = [];

  selectedId!: string;
  isInProject!: boolean;
  showCreateForm = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = params.get("selectedId")!;
      this.isInProject = this.route.parent?.snapshot.toString().includes("projects") ?? false;

      this.loadAssociations();
    });
  }

  loadAssociations() {
    if (this.isInProject) {
      this.projectsDataService.getAssociations(this.selectedId).subscribe(data => {
        this.associations = data;
      });
    } else {
      this.collaboratorDataService.getAssociations(this.selectedId).subscribe(data => {
        this.associations = data;
      });
    }
  }

  onStartCreate() {
    this.showCreateForm = true;
  }

  onCancelCreate() {
    this.showCreateForm = false;
    this.loadAssociations();
  }
}
