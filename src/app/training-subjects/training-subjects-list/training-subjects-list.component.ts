import { Component, inject, input } from '@angular/core';
import { TrainingSubject } from '../training-subject';
import { RouterLink } from '@angular/router';
import { TrainingSubjectSignalsService } from '../training-subjects-signals.service';

@Component({
  selector: 'app-training-subjects-list',
  imports: [RouterLink],
  templateUrl: './training-subjects-list.component.html',
  styleUrl: './training-subjects-list.component.css'
})
export class TrainingSubjectsListComponent {
  signalsService = inject(TrainingSubjectSignalsService);

  trainingSubjects = input.required<TrainingSubject[]>();


  addTrainingSubject() {
    this.signalsService.addTrainingSubject();
  }
}
