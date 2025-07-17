import { Component, inject, signal } from '@angular/core';
import { AssignmentsDataService } from './assignments-data.service';
import { DevicesDataService } from '../devices/devices-data.service';
import { toAssignmentViewModel } from '../collaborators/mappers/assignment.mapper';
import { AssignmentViewModel } from './assignment.viewmodel';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  standalone: true,
  imports: [AssignmentsListComponent]
})
export class AssignmentsComponent {
  private assignmentsDataService = inject(AssignmentsDataService);
  private devicesDataService = inject(DevicesDataService);

  assignments = signal<AssignmentViewModel[]>([]);

  constructor() {
    this.loadAssignments();
  }

  private loadAssignments() {
    this.assignmentsDataService.getAssignments().pipe(
      switchMap(assignments => {
        const assignmentVM$ = assignments.map(a =>
          this.devicesDataService.getDeviceById(a.deviceId).pipe(
            map(device =>
              toAssignmentViewModel(
                a,
                a.collaboratorId,
                device.description,
                device.brand,
                device.serialNumber
              )
            )
          )
        );
        return forkJoin(assignmentVM$);
      })
    ).subscribe({
      next: (viewModels) => {
        this.assignments.set(viewModels);
        console.log('Loaded assignments:', viewModels);
      },
      error: (err) => console.error('Erro ao carregar assignments:', err)
    });
  }
}
