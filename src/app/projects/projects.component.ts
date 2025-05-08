import { Component, inject, OnInit } from '@angular/core';
import { Project } from './project/project';
import { ProjectComponent } from "./project/project.component";
import { ProjectService } from './project.service';

@Component({
  selector: 'app-projects',
  imports: [ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projectList : Project[] = [];
  private service = inject(ProjectService);

  ngOnInit(): void {
    this.service.getProjects().subscribe(data => {
      this.projectList = data;
    }
    );
  }
}
