import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentViewModel } from '../assignment.viewmodel';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './assignments-list.component.html',
  styleUrl: './assignments-list.component.css'
})
export class AssignmentsListComponent {
  @Input() assignments: AssignmentViewModel[] = [];

  selectedAssignmentId!: string;
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectRoute(url: string, id: string) {
    this.router.navigate([url, id], { relativeTo: this.route });
    this.selectedAssignmentId = id;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedAssignmentId = params.get('assignmentId') ?? '';
    });
  }
}
