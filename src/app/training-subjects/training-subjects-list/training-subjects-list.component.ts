import { Component, inject, input } from '@angular/core';
import { TrainingSubject } from '../training-subject';
import { TrainingModuleSignalService } from '../../training-modules/training-modules-signals.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-training-subjects-list',
  imports: [RouterLink],
  templateUrl: './training-subjects-list.component.html',
  styleUrl: './training-subjects-list.component.css'
})
export class TrainingSubjectsListComponent {
  trainingModulesSignalsService = inject(TrainingModuleSignalService);

  isCreatingSubject = this.trainingModulesSignalsService.isCreatingSubject;

  trainingSubjects = input.required<TrainingSubject[]>();


  addTrainingSubject() {
    this.trainingModulesSignalsService.cancelEditSubject();
    this.trainingModulesSignalsService.addTrainingSubject();
  }
}
