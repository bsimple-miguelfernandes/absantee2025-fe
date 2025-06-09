import { Component, inject } from '@angular/core';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingSubject } from '../training-subjects-list/training-subject';
import { TrainingModuleDataService } from '../training-modules-data.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-training-subject-details',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './training-subject-details.component.html',
  styleUrl: './training-subject-details.component.css'
})
export class TrainingSubjectDetailsComponent {
  trainingModuleSignalService = inject(TrainingModuleSignalService);

  private route = inject(ActivatedRoute);
  trainingModuleDataService = inject(TrainingModuleDataService)

  trainingSubject!: TrainingSubject;

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.trainingSubject = data['trainingSubject'];
    });
  }

  close() {
    history.back();
  }

  edit() {
    this.trainingModuleSignalService.openEditForm(this.trainingSubject);
    this.trainingModuleSignalService.cancelCreateSubject();
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
