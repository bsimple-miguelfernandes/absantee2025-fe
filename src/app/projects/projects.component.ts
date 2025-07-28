import { Component, effect, inject, signal } from '@angular/core';
import { ProjectsTableComponent } from "./projects-table/projects-table.component";
import { ProjectsSignalsService } from './projects-signals.service';
import { ProjectsDataService } from './projects-data.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProjectViewModel } from './models/project-view-model.model';
import { SearchProjectsComponent } from "./search-projects/search-projects.component";
import { toProjectViewModel } from './mappers/project.mapper';

@Component({
  selector: 'app-projects',
  imports: [ProjectsTableComponent, RouterOutlet, RouterLink, SearchProjectsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  projectSignalService = inject(ProjectsSignalsService);
  projectCreatedSignal = this.projectSignalService.projectCreated;
  projectUpdatedSignal = this.projectSignalService.projectUpdated;

  projectDataService = inject(ProjectsDataService);
  projects = signal<ProjectViewModel[]>([]);
  filteredList: ProjectViewModel[] = [];

  router = inject(Router);

  constructor() {
    this.projectDataService.getProjects().subscribe({
      next: (projects) => {
        let projectVM = projects.map(proj => toProjectViewModel(proj));
        this.projects.set(projectVM);
        this.filteredList = projectVM;
      },
      error: (error) => {
        console.error('Error loading projects', error);
      }
    });

    effect(() => {
      const projectCreated = this.projectCreatedSignal();
      const projectEdited = this.projectUpdatedSignal();

      if (projectCreated) {
        this.filteredList = [...this.filteredList, projectCreated];
      }

      if (projectEdited) {
        this.filteredList = this.filteredList.map(p => p.id === projectEdited.id ? projectEdited : p);
      }
    });
  }

  isCreatingProject(): boolean {
    return this.router.url.includes('create');
  }

  onFilter(filtered: ProjectViewModel[]): void {
    this.filteredList = filtered;
  }

}
