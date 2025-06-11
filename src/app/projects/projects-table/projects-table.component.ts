import { Component, inject, input } from '@angular/core';
import { ProjectsSignalsService } from '../projects-signals.service';
import { Project } from '../project/project.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-table',
  imports: [RouterLink],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  projects = input.required<Project[]>();
}
