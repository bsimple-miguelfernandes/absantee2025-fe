import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProjectComponent } from "./project/project.component";
import { ProjectsTableComponent } from "./projects-table/projects-table.component";
import { ProjectsSignalsService } from './projects-signals.service';
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";
import { ProjectsDataService } from './projects-data.service';
import { Project } from './project/project';

@Component({
  selector: 'app-projects',
  imports: [ProjectsTableComponent, ProjectComponent, AssociationsProjectCollaboratorComponent],
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
    this.projectDataService.getProjects().subscribe((projects) => {
      this.projects = projects
    });

    this.projectSignalService.selectProject(undefined);
    this.projectSignalService.selectProjectCollaborators(undefined);
  }
}
