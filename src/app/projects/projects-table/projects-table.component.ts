import { Component, inject, input } from '@angular/core';
import { ProjectsDataService } from '../projects-data.service';
import { ProjectsSignalsService } from '../projects-signals.service';
import { Project } from '../project/project';

@Component({
  selector: 'app-projects-table',
  imports: [],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  projects = input.required<Project[]>();

  projectSignalService = inject(ProjectsSignalsService);

  onSelectProject(selected: Project){
    this.projectSignalService.selectProject(selected);
  }

  onSelectProjectCollaborators(selected: Project){
    this.projectSignalService.selectProjectCollaborators(selected);
  }
}
