import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectsSignalsService } from '../projects-signals.service';
import { Project } from './project';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectSignalService = inject(ProjectsSignalsService);

  project!: Project;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data['ProjectData'];
    });
  }

  editProject(project: Project){
    this.projectSignalService.startEditProject(project);
  }
}
