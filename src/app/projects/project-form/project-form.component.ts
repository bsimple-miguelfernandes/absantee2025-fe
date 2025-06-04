import { CommonModule } from '@angular/common';
import { Component, inject, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectsSignalsService } from '../projects-signals.service';
import { ProjectForm } from '../project/project';
import { PeriodDateForm } from '../../PeriodDate';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
  projectSignalsService = inject(ProjectsSignalsService);

  isEditingProjectForm = this.projectSignalsService.isEditingProjectForm;
  isCreatingProjectForm = this.projectSignalsService.isCreatingProjectForm;

  projectForm!: FormGroup;

  constructor() {

    this.projectForm = new FormGroup<ProjectForm>({
      title: new FormControl(),
      acronym: new FormControl(),
      periodDate: new FormGroup<PeriodDateForm>({
        _initDate: new FormControl(),
        _finalDate: new FormControl(),
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

  cancel() {
    this.projectSignalsService.cancelCreateProject();
    this.projectSignalsService.cancelEditProject();
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;

      const project = this.isEditingProjectForm() ? { ...this.isEditingProjectForm(), ...formValue } : formValue;

      if (this.isCreatingProjectForm()) {
        this.projectSignalsService.saveProject(project);
      } else if (this.isEditingProjectForm()) {
        this.projectSignalsService.updateProject(project);
      }
      this.projectForm.reset();
    }
  }
}

