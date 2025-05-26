import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectsSignalsService } from '../projects-signals.service';

@Component({
  selector: 'app-project',
  imports: [DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectSignalService = inject(ProjectsSignalsService);
  projectSelected = this.projectSignalService.projectSelected;
}