import { Component, inject } from '@angular/core';
import { TrainingModuleSignalService } from '../training-modules-signals.service';

@Component({
  selector: 'app-training-subject-details',
  imports: [],
  templateUrl: './training-subject-details.component.html',
  styleUrl: './training-subject-details.component.css'
})
export class TrainingSubjectDetailsComponent {
  trainingModuleSignalService = inject(TrainingModuleSignalService);

  trainingSubject = this.trainingModuleSignalService.selectedTrainingSubject;
}
