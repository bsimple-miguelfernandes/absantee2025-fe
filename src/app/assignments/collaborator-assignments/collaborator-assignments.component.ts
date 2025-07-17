// collaborator-assignments.component.ts
import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentViewModel } from '../assignment.viewmodel';
import { AssignmentsDataService } from '../assignments-data.service';
import { toAssignmentViewModel } from '../../collaborators/mappers/assignment.mapper';

@Component({
  selector: 'app-collaborator-assignments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collaborator-assignments.component.html'
})
export class CollaboratorAssignmentsComponent implements OnChanges {
  @Input() collaboratorId!: string;

  assignments = signal<AssignmentViewModel[]>([]);

  constructor(private service: AssignmentsDataService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collaboratorId'] && this.collaboratorId) {
      this.service.getAssignmentsByCollaboratorId(this.collaboratorId).subscribe({
        next: (dtos) => {
          const viewModels = dtos.map(toAssignmentViewModel);
          this.assignments.set(viewModels);
        },
        error: err => console.error('Erro ao buscar assignments do colaborador:', err)
      });
    }
  }

}
