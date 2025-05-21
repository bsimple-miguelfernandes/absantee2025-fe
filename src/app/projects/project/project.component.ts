import { Component, inject, input } from '@angular/core';
import { Project } from './project';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../project.service';
import { ProjectsSignalsService } from '../projects-signals.service';

@Component({
  selector: 'app-project',
  imports: [DatePipe, RouterModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
}