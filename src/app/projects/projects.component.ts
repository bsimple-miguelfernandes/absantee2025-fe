import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProjectComponent } from "./project/project.component";
import { ProjectsTableComponent } from "./projects-table/projects-table.component";
import { ProjectsSignalsService } from './projects-signals.service';
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";
import { ProjectsDataService } from './projects-data.service';
import { Project } from './project/project';
import { ProjectCreateComponent } from "./create-project/create-project.component";
import { ProjectFormComponent } from "./project-form/project-form.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectsTableComponent, ProjectComponent, AssociationsProjectCollaboratorComponent, ProjectFormComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
  projectCollaboratorsSelected = this.projectSignalService.projectCollaboratorSelected;
  isCreatingProjectSignal = this.projectSignalService.isCreatingProjectForm;
  isEditingProjectSignal = this.projectSignalService.isEditingProjectForm;
  projectCreatedSignal = this.projectSignalService.projectCreated;

  projectDataService = inject(ProjectsDataService);
  projects = signal<Project[]>([]);

  constructor() {
    this.projectDataService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
      },
      error: (error) => {
        alert('Error loading projects');
        console.error('Error loading projects', error);
      }
    })

    this.projectSignalService.selectProject(undefined);
    this.projectSignalService.selectProjectCollaborators(undefined);

    effect(() => {
      const projectCreated = this.projectCreatedSignal();

      if (projectCreated) {
        this.projects.update(projects => [...projects, projectCreated]);
      }
    })
  }


  startCreate() {
    this.projectSignalService.startCreateProject();
  }
}
