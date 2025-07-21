import { Injectable, signal } from '@angular/core';
import { TaskForceViewModel } from '../models/task-force.view-model';

@Injectable({
  providedIn: 'root'
})
export class TaskForceSignalService {

  private taskForceCreatedSignal = signal<TaskForceViewModel | undefined>(undefined);
  readonly taskForceCreated = this.taskForceCreatedSignal.asReadonly();

  private taskForceUpdatedSignal = signal<TaskForceViewModel | undefined>(undefined);
  readonly taskForceUpdated = this.taskForceUpdatedSignal.asReadonly();

  saveTaskForce(taskForce: TaskForceViewModel) {
    this.taskForceCreatedSignal.set(taskForce);
  }

  updateTaskForce(taskForce: TaskForceViewModel) {
    this.taskForceUpdatedSignal.set(taskForce);
  }
}
