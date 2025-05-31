import { Component, inject } from '@angular/core';
import { TrainingModuleSignalService } from '../training-modules-signals.service';

@Component({
  selector: 'app-training-module-details',
  imports: [],
  templateUrl: './training-module-details.component.html',
  styleUrl: './training-module-details.component.css'
})
export class TrainingModuleDetailsComponent {
  trainingModuleSignalService = inject(TrainingModuleSignalService);

  trainingModule = this.trainingModuleSignalService.selectedTrainingModule;

}
