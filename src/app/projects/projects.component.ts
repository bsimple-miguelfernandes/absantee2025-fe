import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProjectComponent } from "./project/project.component";
import { ProjectsTableComponent } from "./projects-table/projects-table.component";
import { ProjectsSignalsService } from './projects-signals.service';
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";
import { ProjectsDataService } from './projects-data.service';
import { Project } from './project/project';
import { ProjectCreateComponent } from "./create-project/create-project.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectsTableComponent, ProjectComponent, AssociationsProjectCollaboratorComponent, ProjectCreateComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;

  projectDataService = inject(ProjectsDataService);
  projects : Project[] = [];

  constructor() {
    this.projectDataService.getProjects().subscribe({
    next: (projects) => {
      this.projects = projects;
    },
    error:(error) => {
      alert('Error loading projects');
      console.error('Error loading projects', error);
    }
   })

    this.projectSignalService.selectProject(undefined);
    this.projectSignalService.selectProjectCollaborators(undefined);
  }


  startCreate() {
    this.projectSignalService.startCreateProject();
  }
}
