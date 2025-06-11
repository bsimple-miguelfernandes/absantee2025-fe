import { Component, inject, effect, signal } from '@angular/core';
import { TrainingSubjectsListComponent } from "./training-subjects-list/training-subjects-list.component";
import { TrainingSubject } from './training-subject';
import { TrainingSubjectDataService } from './training-subjects-data.service';
import { toTrainingSubjectViewModel } from '../collaborators/mappers/trainingSubject.mapper';
import { RouterOutlet } from '@angular/router';
import { TrainingSubjectSignalsService } from './training-subjects-signals.service';

@Component({
  selector: 'app-training-subjects',
  imports: [TrainingSubjectsListComponent, RouterOutlet],
  templateUrl: './training-subjects.component.html',
  styleUrl: './training-subjects.component.css'
})
export class TrainingSubjectsComponent {

  trainingSubjectDataService = inject(TrainingSubjectDataService);
  trainingSubjectSignalService = inject(TrainingSubjectSignalsService);

  trainingSubjectCreated = this.trainingSubjectSignalService.createdTrainingSubject;
  trainingSubjectUpdated = this.trainingSubjectSignalService.updatedTrainingSubject;

  trainingSubjects: TrainingSubject[] = [];

  constructor() {
    this.loadSubjects();

    effect(() => {
      if (this.trainingSubjectCreated() || this.trainingSubjectUpdated()) {
        this.loadSubjects();
      }
    });
  }

  loadSubjects() {
    this.trainingSubjectDataService.getTrainingSubjects().subscribe({
      next: (trainingSubjects) => {
        const trainingSubjectVM = trainingSubjects.map(toTrainingSubjectViewModel)
        this.trainingSubjects = trainingSubjectVM;
      }
    });
  }
}
