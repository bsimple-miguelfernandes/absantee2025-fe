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
  private dataService = inject(AssignmentsDataService);
  assignments = signal<AssignmentViewModel[]>([]);

  constructor() {
    this.loadAssignments();
  }

  private loadAssignments() {
    this.dataService.getAssignmentsWithDetails().subscribe({
      next: (dtos) => this.assignments.set(dtos.map(toAssignmentViewModel)),
      error: (err) => console.error('Erro ao carregar assignments:', err)
    });
  }
}