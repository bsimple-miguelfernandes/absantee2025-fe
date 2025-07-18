import { Component, inject } from '@angular/core';
import { TaskForceCollaboratorViewModel } from '../models/task-force.view-model';
import { ActivatedRoute } from '@angular/router';
import { TaskForceDataService } from '../services/task-force-data.service';
import { UpdateTaskForceCollaboratorsDTO } from '../models/task-force.model';
import { toTaskForceCollaboratorModelView } from '../mappers/task-force.mapper';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-force-collaborators',
  imports: [ReactiveFormsModule],
  templateUrl: './task-force-collaborators.component.html',
  styleUrl: './task-force-collaborators.component.css'
})
export class TaskForceCollaboratorsComponent {
  taskForceCollaboratorForm!: FormGroup;
  collaborators: TaskForceCollaboratorViewModel[] = [];
  taskForceId: string = '';
  showForm: boolean = false;

  private route = inject(ActivatedRoute);
  private service = inject(TaskForceDataService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('taskForceId');
      if (id) {
        this.taskForceId = id;
        this.service.getTaskForcesCollaboratorByTaskForceId(id).subscribe({
          next: res => this.collaborators = res.map(toTaskForceCollaboratorModelView),
          error: err => console.error('Error fetching collaborators', err)
        });
      }
    });

    this.taskForceCollaboratorForm = this.fb.group({
      collaborator: ['', [Validators.required]]
    });
  }

  addCollaborator() {
    if (this.taskForceCollaboratorForm.invalid) {
      this.taskForceCollaboratorForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForceCollaboratorForm.value;

    if (formValue.collaborator && this.taskForceId) {
      var updateDTO: UpdateTaskForceCollaboratorsDTO =
      {
        collaborators: [formValue.collaborator]
      }
      this.service.addCollaboratorToTaskForce(this.taskForceId, updateDTO).subscribe({
        next: rest => this.collaborators = rest.map(toTaskForceCollaboratorModelView),
        error: err => console.error('Error adding collaborators', err)
      });
    }
    this.switchAddCollaborator();
  }

  removeCollaborator(collab: string) {
    if (collab && this.taskForceId) {
      var updateDTO: UpdateTaskForceCollaboratorsDTO =
      {
        collaborators: [collab]
      }
      this.service.removeCollaboratorToTaskForce(this.taskForceId, updateDTO).subscribe({
        next: rest => this.collaborators = rest.map(toTaskForceCollaboratorModelView),
        error: err => console.error('Error removing collaborators', err)
      });
    }
  }

  switchAddCollaborator() {
    this.showForm = !this.showForm;
  }
}
