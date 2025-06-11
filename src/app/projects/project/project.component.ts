import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectsSignalsService } from '../projects-signals.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectViewModel } from '../models/project-view-model.model';

@Component({
  selector: 'app-project',
  imports: [DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectSignalService = inject(ProjectsSignalsService);
  route = inject(ActivatedRoute);

  project!: ProjectViewModel;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data['ProjectData'];
    });
  }

  editProject(project: ProjectViewModel) {
    this.projectSignalService.startEditProject(project);
  }
}
