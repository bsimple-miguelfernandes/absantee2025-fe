import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssignmentViewModel } from '../assignment.viewmodel';
import { AssignmentDetails } from '../assignment-details';

@Component({
  selector: 'app-assignment-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './assignment-details.component.html',
  styleUrl: './assignment-details.component.css'
})
export class AssignmentDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  assignment!: AssignmentDetails;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assignment = data['assignment'];
    });
  }

  close() {
    this.router.navigate(['/assignments']);
  }
}
