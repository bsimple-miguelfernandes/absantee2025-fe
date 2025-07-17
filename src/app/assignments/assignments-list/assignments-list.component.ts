import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentViewModel } from '../assignment.viewmodel';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments-list.component.html',
  styleUrl: './assignments-list.component.css'
})
export class AssignmentsListComponent {
  @Input() assignments: AssignmentViewModel[] = [];
}
