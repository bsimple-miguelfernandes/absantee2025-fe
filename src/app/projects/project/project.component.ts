import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectsSignalsService } from '../services/projects-signals.service';
import { Project } from './project.model';
import { ProjectViewModel } from './project.viewmodel';

@Component({
  selector: 'app-project',
  imports: [DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  project = input.required<ProjectViewModel>();
  projectSignalService = inject(ProjectsSignalsService);

  editProject(project: Project) {
    this.projectSignalService.startEditProject(project);
  }
}