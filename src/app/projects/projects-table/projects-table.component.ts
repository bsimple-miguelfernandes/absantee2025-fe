import { Component, input } from '@angular/core';
import { Project } from '../project/project';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-table',
  imports: [RouterModule],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  projects = input.required<Project[]>();

}
