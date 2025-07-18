import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateTaskForceDTO } from '../models/task-force.model';
import { TaskForceDataService } from '../services/task-force-data.service';

@Component({
  selector: 'app-task-force-create',
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true,
  templateUrl: './task-force-create.component.html',
  styleUrl: './task-force-create.component.css'
})
export class TaskForceCreateComponent {
  taskForceForm!: FormGroup;

  // Fetched from service
  projects: { id: string; title: string }[] = [];
  subjects: { id: string; description: string }[] = [];
  collaborators: { id: string; email: string }[] = [];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private taskForceService = inject(TaskForceDataService);

  ngOnInit(): void {
    this.taskForceForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(100)]],
      projectId: ['', Validators.required],
      subjectId: ['', Validators.required],
      initDate: ['', Validators.required],
      endDate: ['', Validators.required],
      collaboratorIds: [[], [Validators.required, Validators.minLength(2)]],
    });

    // Load data from service
    this.projects = this.taskForceService.getProjects();
    this.subjects = this.taskForceService.getSubjects();
    this.collaborators = this.taskForceService.getCollaborators();
  }

  get description(): AbstractControl { return this.taskForceForm.get('description')!; }
  get projectId(): AbstractControl { return this.taskForceForm.get('projectId')!; }
  get subjectId(): AbstractControl { return this.taskForceForm.get('subjectId')!; }
  get initDate(): AbstractControl { return this.taskForceForm.get('initDate')!; }
  get endDate(): AbstractControl { return this.taskForceForm.get('endDate')!; }
  get collaboratorIds(): AbstractControl { return this.taskForceForm.get('collaboratorIds')!; }

  get periodInvalid(): boolean {
    const start = this.initDate.value;
    const end = this.endDate.value;
    return (
      (this.initDate.touched || this.endDate.touched) &&
      (!start || !end || new Date(start) >= new Date(end))
    );
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const selected = this.collaboratorIds.value as string[];

    if (checkbox.checked) {
      this.collaboratorIds.setValue([...selected, checkbox.value]);
    } else {
      this.collaboratorIds.setValue(selected.filter(id => id !== checkbox.value));
    }

    this.collaboratorIds.markAsTouched();
  }

  createTaskForce(): void {
    if (this.taskForceForm.invalid || this.periodInvalid) {
      this.taskForceForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForceForm.value;

    const dto: CreateTaskForceDTO = {
      description: formValue.description,
      subjectId: formValue.subjectId,
      projectId: formValue.projectId,
      initDate: new Date(formValue.initDate),
      endDate: new Date(formValue.endDate),
      projectInitDate: new Date(formValue.initDate),
      projectEndDate: new Date(formValue.endDate),
      collaborators: formValue.collaboratorIds
    };

    this.taskForceService.createTaskForce(dto).subscribe({
      next: () => this.router.navigate(['../']), // go back to taskforces list
      error: err => console.error('Error creating task force', err)
    });
  }
}
