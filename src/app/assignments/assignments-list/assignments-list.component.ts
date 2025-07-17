import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentViewModel } from '../assignment.viewmodel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './assignments-list.component.html',
  styleUrl: './assignments-list.component.css'
})
export class AssignmentsListComponent {
  @Input() assignments: AssignmentViewModel[] = [];
}
