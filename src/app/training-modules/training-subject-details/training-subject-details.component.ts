import { Component, inject } from '@angular/core';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TrainingSubject } from '../training-subjects-list/training-subject';
import { TrainingModuleDataService } from '../training-modules-data.service';

@Component({
  selector: 'app-training-subject-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training-subject-details.component.html',
  styleUrl: './training-subject-details.component.css'
})
export class TrainingSubjectDetailsComponent {
  trainingModuleSignalService = inject(TrainingModuleSignalService);
  trainingModuleDataService = inject(TrainingModuleDataService)

  trainingSubject = this.trainingModuleSignalService.selectedTrainingSubject;

  close(){
    this.trainingModuleSignalService.disableSubjectDetails();
  }

  edit(trainingSubject: TrainingSubject){
    this.trainingModuleSignalService.openEditForm(trainingSubject);
    this.trainingModuleSignalService.disableSubjectDetails();
    this.trainingModuleSignalService.cancelCreateSubject();
  }
}
