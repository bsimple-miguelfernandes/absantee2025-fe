import { Component, input } from '@angular/core';
import { Project } from './project';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project',
  imports: [DatePipe, RouterModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  project = input.required<Project>();
}