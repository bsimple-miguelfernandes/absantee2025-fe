import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectViewModel } from '../models/project-view-model.model';

@Component({
  selector: 'app-projects-table',
  imports: [RouterModule],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  projects = input.required<ProjectViewModel[]>();

  router = inject(Router);
  route = inject(ActivatedRoute);

  selectedProject!: string;

  selectRoute(url: string, id: string) {
    const currentUrl = this.router.url;

    if (this.selectedProject === id && currentUrl.includes(url)) {
      this.router.navigate(['/projects']);
      this.selectedProject = "";
    } else {
      this.router.navigate([url, id], { relativeTo: this.route });
      this.selectedProject = id;
    }
  }
}
