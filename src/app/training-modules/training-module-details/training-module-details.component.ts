import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingModule } from '../training-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training-module-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training-module-details.component.html',
  styleUrl: './training-module-details.component.css'
})
export class TrainingModuleDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  trainingModule!: TrainingModule;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.trainingModule = data['trainingModule'];
    });
  }

  close() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
