import { Component, inject, signal } from '@angular/core';
import { AssignmentsDataService } from './assignments-data.service';
import { DevicesDataService } from '../devices/devices-data.service';
import { toAssignmentViewModel } from '../collaborators/mappers/assignment.mapper';
import { AssignmentViewModel } from './assignment.viewmodel';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';

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
    this.assignmentsDataService.getAssignments().subscribe({
      next: async (assignments) => {
        const viewModels: AssignmentViewModel[] = [];

        for (const a of assignments) {
          try {
            const device = await this.devicesDataService.getDeviceById(a.deviceId).toPromise();

            const vm = toAssignmentViewModel(
              a,
              a.collaboratorId,
              device!.description,
              device!.brand,
              device!.serialNumber
            );

            viewModels.push(vm);
          } catch (err) {
            console.warn('Erro ao carregar dados para Assignment:', err);
          }
        }

        this.assignments.set(viewModels);
        console.log('Loaded assignments:', viewModels);
      },
      error: (err) => console.error('Erro ao carregar assignments:', err)
    });
  }
}
