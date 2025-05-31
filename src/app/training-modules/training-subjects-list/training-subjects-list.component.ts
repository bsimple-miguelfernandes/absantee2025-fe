import { Component, inject, input } from '@angular/core';
import { TrainingSubject } from './training-subject';
import { TrainingModuleSignalService } from '../training-modules-signals.service';

@Component({
  selector: 'app-training-subjects-list',
  imports: [],
  templateUrl: './training-subjects-list.component.html',
  styleUrl: './training-subjects-list.component.css'
})
export class TrainingSubjectsListComponent {
  trainingModulesSignalsService = inject(TrainingModuleSignalService);

  trainingSubjects = input.required<TrainingSubject[]>();

  selectTrainingSubject(trainingSubject: TrainingSubject){
    this.trainingModulesSignalsService.selectTrainingSubject(trainingSubject);
  }
}
