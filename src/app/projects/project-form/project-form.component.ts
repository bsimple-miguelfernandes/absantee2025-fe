import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeriodDateForm } from '../../PeriodDate';
import { ProjectsDataService } from '../projects-data.service';
import { ProjectForm } from '../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '../../utils/date';
import { ProjectViewModel } from '../models/project-view-model.model';
import { ProjectsSignalsService } from '../projects-signals.service';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);
  projectDataService = inject(ProjectsDataService);
  projectSignalService = inject(ProjectsSignalsService);

  projectForm!: FormGroup;
  projectToEdit?: ProjectViewModel;

  ngOnInit() {

    this.projectForm = new FormGroup<ProjectForm>({
      title: new FormControl('', Validators.required),
      acronym: new FormControl('', Validators.required),
      periodDate: new FormGroup<PeriodDateForm>({
        initDate: new FormControl(formatDate(new Date()), Validators.required),
        finalDate: new FormControl(formatDate(new Date()), Validators.required),
      })
    });

    this.route.data.subscribe(data => {
      const project = data['ProjectData'];
      if (project) {
        this.projectToEdit = project;
        this.projectForm.patchValue(project);
      }
    });
  };

  exit() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/projects']);
    }
  }

  onSubmit() {
    if (!this.projectForm.valid) return;

    const formValue = this.projectForm.value;
    const project = this.projectToEdit ? { ...this.projectToEdit, ...formValue } : formValue;

    if (this.projectToEdit) {
      this.projectSignalService.updateProject(project);

      this.projectDataService.updateProject(project).subscribe({
        next: (updatedProject) => {
          this.projectSignalService.updateProject(updatedProject);
        }
      });
    } else {
      this.projectDataService.createProject(project).subscribe({
        next: (createdProject) => {
          this.projectSignalService.saveProject(createdProject);
        }
      });
    }
    this.projectForm.reset();
    this.exit();
  }
}
