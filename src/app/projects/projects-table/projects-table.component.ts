import { Component, input } from '@angular/core';
import { Project } from '../project/project';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from "../../filters/filters.component";

@Component({
  selector: 'app-projects-table',
  imports: [RouterModule, FiltersComponent],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  projects = input.required<Project[]>();

  filteredProjects: Project[] = [];

  ngOnChanges() {
    this.filteredProjects = this.projects();
  }

  applyFilters(filters: Record<string, string>) {
    const title = filters['title']?.toLowerCase() ?? '';
    const acronym = filters['acronym']?.toLowerCase() ?? '';

    this.filteredProjects = this.projects().filter(project =>
      (!title || project.title.toLowerCase().includes(title)) &&
      (!acronym || project.acronym.toLowerCase().includes(acronym))
    )
  }

}
