import { Component, effect, inject, signal } from '@angular/core';
import { AssignmentsDataService } from './assignments-data.service';
import { toAssignmentViewModel } from '../collaborators/mappers/assignment.mapper';
import { AssignmentViewModel } from './assignment.viewmodel';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';
import { RouterOutlet } from '@angular/router';
import { AssignmentSignalsService } from './assigments-signals.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
  standalone: true,
  imports: [AssignmentsListComponent, RouterOutlet]
})
export class AssignmentsComponent {
  private dataService = inject(AssignmentsDataService);
  private signalService = inject(AssignmentSignalsService);

  assignments = signal<AssignmentViewModel[]>([]);

  constructor() {
    this.loadAssignments();

    effect(() => {
      const created = this.signalService.createdAssignment();
      if (created !== undefined) {
        this.loadAssignments();
        this.signalService.clearCreatedAssignment();
      }
    })
  }

  private loadAssignments() {
    this.dataService.getAssignmentsWithDetails().subscribe({
      next: (dtos) => this.assignments.set(dtos.map(toAssignmentViewModel)),
      error: (err) => console.error('Erro ao carregar assignments:', err)
    });
  }
}