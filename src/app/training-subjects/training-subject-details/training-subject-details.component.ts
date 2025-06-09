import { Component, inject } from '@angular/core';
import { TrainingModuleSignalService } from '../../training-modules/training-modules-signals.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingSubject } from '../training-subject';
import { TrainingModuleDataService } from '../../training-modules/training-modules-data.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-training-subject-details',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './training-subject-details.component.html',
  styleUrl: './training-subject-details.component.css'
})
export class TrainingSubjectDetailsComponent {
  trainingModuleSignalService = inject(TrainingModuleSignalService);
  trainingModuleDataService = inject(TrainingModuleDataService)
  private route = inject(ActivatedRoute);

  trainingSubject!: TrainingSubject;

  constructor(private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.trainingSubject = data['trainingSubject'];
    });
  }

  close() {
    this.router.navigate(['/training-subjects'])
  }
}

export const resolverTrainingSubject: ResolveFn<TrainingSubject> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const trainingSubjectService = inject(TrainingModuleDataService);
  const trainingSubject = trainingSubjectService.getTrainingSubjectById(activatedRoute.params['trainingSubjectId'])
  return trainingSubject;
}
