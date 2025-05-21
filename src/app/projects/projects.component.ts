import { Component, inject, OnInit } from '@angular/core';
import { Project } from './project/project';
import { ProjectComponent } from "./project/project.component";
import { ProjectService } from './project.service';
import { ProjectsTableComponent } from "./projects-table/projects-table.component";
import { ProjectsSignalsService } from './projects-signals.service';
import { ProjectCollaboratorsComponent } from "./project-collaborators/project-collaborators.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectsTableComponent, ProjectComponent, ProjectCollaboratorsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;
}
