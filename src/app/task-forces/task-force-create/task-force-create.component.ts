import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateTaskForceDTO } from '../models/task-force.model';
import { TaskForceDataService } from '../services/task-force-data.service';
import { TaskForceSignalService } from '../services/task-force-signal.service';
import { toTaskForceModelView } from '../mappers/task-force.mapper';
import { SubjectService } from '../../subjects/services/subject.service';
import { SubjectViewModel } from '../../subjects/models/subject.view-model';
import { toSubjectViewModel } from '../../subjects/mappers/subject.mapper';

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
  projects: { id: string; title: string, initDate: string, endDate: string }[] = [];
  subjects: SubjectViewModel[] = [];
  collaborators: { id: string; email: string, initDate: string, endDate: string }[] = [];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private taskForceService = inject(TaskForceDataService);
  private taskForceSignalService = inject(TaskForceSignalService);
  private subjectService = inject(SubjectService);

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
    this.subjectService.getAllSubjects().subscribe(
      subjectPage => {
        this.subjects = subjectPage.pageSubjects.map(toSubjectViewModel);
      });
    this.collaborators = this.taskForceService.getCollaborators();
  }

  get description() { return this.taskForceForm.get('description')!; }
  get projectId() { return this.taskForceForm.get('projectId')!; }
  get subjectId() { return this.taskForceForm.get('subjectId')!; }
  get initDate() { return this.taskForceForm.get('initDate')!; }
  get endDate() { return this.taskForceForm.get('endDate')!; }
  get collaboratorIds() { return this.taskForceForm.get('collaboratorIds')!; }

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

  toDateOnlyString = (d: string) => new Date(d).toISOString().split('T')[0];

  createTaskForce(): void {
    if (this.taskForceForm.invalid || this.periodInvalid) {
      this.taskForceForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForceForm.value;

    const project = this.projects.find(x => x.id == formValue.projectId);
    if (!project) {
      this.taskForceForm.markAllAsTouched();
      return;
    }
    const projectInitDate = project.initDate;
    const projectEndDate = project.endDate;

    const dto: CreateTaskForceDTO = {
      description: formValue.description,
      subjectId: formValue.subjectId,
      projectId: formValue.projectId,
      initDate: this.toDateOnlyString(formValue.initDate),
      endDate: this.toDateOnlyString(formValue.endDate),
      projectInitDate: this.toDateOnlyString(projectInitDate),
      projectEndDate: this.toDateOnlyString(projectEndDate),
      collaborators: formValue.collaboratorIds
    };

    this.taskForceService.createTaskForce(dto).subscribe({
      next: (taskForce) => {
        this.taskForceSignalService.saveTaskForce(toTaskForceModelView(taskForce));
        this.router.navigate(['../']);
      },
      error: err => console.error('Error creating task force', err)
    });
  }

}



