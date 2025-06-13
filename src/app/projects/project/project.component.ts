import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectViewModel } from '../models/project-view-model.model';

@Component({
  selector: 'app-project',
  imports: [DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);

  project!: ProjectViewModel;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data['ProjectData'];
    });
  }

  editProject(project: ProjectViewModel) {
    this.router.navigate(['projects/edit', project.id]);
  }
}
