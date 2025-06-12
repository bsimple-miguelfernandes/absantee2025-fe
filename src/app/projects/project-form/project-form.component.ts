import { CommonModule } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsSignalsService } from '../projects-signals.service';
import { PeriodDateForm } from '../../PeriodDate';
import { ProjectsDataService } from '../projects-data.service';
import { ProjectForm } from '../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  projectSignalsService = inject(ProjectsSignalsService);
  projectDataService = inject(ProjectsDataService);
  router = inject(Router);

  isEditingProjectForm = this.projectSignalsService.isEditingProjectForm;
  isCreatingProjectForm = this.projectSignalsService.isCreatingProjectForm;

  projectForm!: FormGroup;

  constructor() {

    this.projectForm = new FormGroup<ProjectForm>({
      title: new FormControl('', Validators.required),
      acronym: new FormControl('', Validators.required),
      periodDate: new FormGroup<PeriodDateForm>({
        initDate: new FormControl(this.formatDate(new Date()), Validators.required),
        finalDate: new FormControl(this.formatDate(new Date()), Validators.required),
      })
    });

    effect(() => {
      const project = this.isEditingProjectForm();
      if (project) {
        this.projectForm.patchValue(project);
      } else {
        this.projectForm.reset();
      }
    });
  };

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  cancel() {
    this.projectSignalsService.cancelCreateProject();
    this.projectSignalsService.cancelEditProject();
    this.router.navigate(['/projects']);

  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;

      const project = this.isEditingProjectForm() ? { ...this.isEditingProjectForm(), ...formValue } : formValue;

      if (this.isCreatingProjectForm()) {

        this.projectDataService.createProject(project).subscribe({
          next: (createdProject) => {
            console.log("Created project: ", createdProject);
            this.projectSignalsService.saveProject(project);
            this.projectSignalsService.cancelCreateProject();
          }
        })
      } else if (this.isEditingProjectForm()) {
        this.projectSignalsService.updateProject(project);

        this.projectDataService.updateProject(project).subscribe({
          next: (updatedProject) => {
            console.log("Updated Project: ", updatedProject);
            this.projectSignalsService.updateProject(project);
            this.projectSignalsService.cancelEditProject();
          }
        })
      }
      this.projectForm.reset();
    }
    this.router.navigate(['/projects']);
  }

}

