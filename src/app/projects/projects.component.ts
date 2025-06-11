import { Component, effect, inject, signal } from '@angular/core';
import { ProjectsTableComponent } from "./projects-table/projects-table.component";
import { ProjectsSignalsService } from './projects-signals.service';
import { ProjectsDataService } from './projects-data.service';
import { ProjectFormComponent } from "./project-form/project-form.component";
import { RouterModule } from '@angular/router';
import { ProjectViewModel } from './models/project-view-model.model';
import { SearchProjectsComponent } from "./search-projects/search-projects.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectsTableComponent, ProjectFormComponent, RouterModule, SearchProjectsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  projectSignalService = inject(ProjectsSignalsService);
  isCreatingProjectSignal = this.projectSignalService.isCreatingProjectForm;
  isEditingProjectSignal = this.projectSignalService.isEditingProjectForm;
  projectCreatedSignal = this.projectSignalService.projectCreated;
  projectUpdatedSignal = this.projectSignalService.projectUpdated;

  projectDataService = inject(ProjectsDataService);
  projects = signal<ProjectViewModel[]>([]);

  filteredList: ProjectViewModel[] = [];

  constructor() {
    this.projectDataService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.filteredList = projects;
      },
      error: (error) => {
        alert('Error loading projects');
        console.error('Error loading projects', error);
      }
    })

    effect(() => {
      const projectCreated = this.projectCreatedSignal();
      const projectEdited = this.projectUpdatedSignal();

      if (projectCreated) {
        this.projects.update(projects => [...projects, projectCreated]);
      }

      if (projectEdited) {
        this.projects.update(projects =>
          projects.map(p => p.id === projectEdited.id ? projectEdited : p)
        );
      }
    })
  }

  startCreate() {
    this.projectSignalService.startCreateProject();
  }

  onFilter(filtered: ProjectViewModel[]) {
    this.filteredList = filtered;
  }

}
