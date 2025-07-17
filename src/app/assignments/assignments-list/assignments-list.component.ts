import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentViewModel } from '../assignment.viewmodel';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FiltersComponent } from '../../filters/filters.component';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FiltersComponent],
  templateUrl: './assignments-list.component.html',
  styleUrl: './assignments-list.component.css'
})
export class AssignmentsListComponent {
  @Input() assignments: AssignmentViewModel[] = [];

  filteredAssignments: AssignmentViewModel[] = [];
  selectedAssignmentId!: string;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectRoute(url: string, id: string) {
    this.router.navigate([url, id], { relativeTo: this.route });
    this.selectedAssignmentId = id;
  }

  ngOnChanges() {
    this.filteredAssignments = this.assignments;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedAssignmentId = params.get('assignmentId') ?? '';
    });
  }

  applyFilters(filters: Record<string, string>) {
    const idFilter = filters['id']?.toLowerCase() ?? '';
    const emailFilter = filters['collaboratorEmail']?.toLowerCase() ?? '';
    const descriptionFilter = filters['deviceDescription']?.toLowerCase() ?? '';
    const initDateFilter = filters['initDate'] ? new Date(filters['initDate']) : null;
    const finalDateFilter = filters['finalDate'] ? new Date(filters['finalDate']) : null;

    this.filteredAssignments = this.assignments.filter(a => {
      const assignmentInit = new Date(a.period.initDate);
      const assignmentFinal = new Date(a.period.finalDate);

      return (
        (!idFilter || a.id.toLowerCase().includes(idFilter)) &&
        (!emailFilter || a.collaboratorEmail.toLowerCase().includes(emailFilter)) &&
        (!descriptionFilter || a.deviceDescription.toLowerCase().includes(descriptionFilter)) &&
        (!initDateFilter || assignmentInit >= initDateFilter) &&
        (!finalDateFilter || assignmentFinal <= finalDateFilter)
      );
    });
  }
}
