import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProjectComponent } from "./project/project.component";
import { ProjectsTableComponent } from "./projects-table/projects-table.component";
import { ProjectsSignalsService } from './projects-signals.service';
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectsTableComponent, ProjectComponent, AssociationsProjectCollaboratorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;

  ngOnInit(): void {
    this.projectSignalService.selectProject(undefined);
    this.projectSignalService.selectProjectCollaborators(undefined)
  }
}
