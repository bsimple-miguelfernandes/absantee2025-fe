import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskForceDataService } from '../services/task-force-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateDTO } from '../models/task-force.model';
import { TaskForceSignalService } from '../services/task-force-signal.service';

@Component({
  selector: 'app-task-force-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './task-force-edit.component.html',
  styleUrl: './task-force-edit.component.css'
})
export class TaskForceEditComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private taskForceService = inject(TaskForceDataService);
  private taskForceSignalService = inject(TaskForceSignalService);

  form!: FormGroup;
  taskForceId!: string;

  ngOnInit(): void {
    this.taskForceId = this.route.snapshot.paramMap.get('taskForceId')!;

    if (!this.taskForceId) {
      console.error('taskForceId not found in route');
      return;
    }

    this.form = this.fb.group({
      initDate: [null],
      endDate: [null],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const update: UpdateDTO = this.form.value;
      this.taskForceService.updateTaskForceDetails(this.taskForceId, update)
        .subscribe({
          next: (response) => {
            this.taskForceSignalService.updateTaskForce(response);
            this.router.navigate(['../']);
          },
          error: (err) => {
            console.error('Update failed:', err);
          }
        });
    }
  }
}
