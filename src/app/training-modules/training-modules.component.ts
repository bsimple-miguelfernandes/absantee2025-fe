import { Component, inject } from '@angular/core';
import { TrainingModulesListComponent } from "./training-modules-list/training-modules-list.component";
import { TrainingModuleDataService } from './training-modules-data.service';
import { TrainingModule } from './training-module';
import { TrainingSubjectsListComponent } from './training-subjects-list/training-subjects-list.component';
import { TrainingSubject } from './training-subjects-list/training-subject';
import { TrainingModuleDetailsComponent } from "./training-module-details/training-module-details.component";
import { TrainingSubjectDetailsComponent } from "./training-subject-details/training-subject-details.component";

@Component({
  selector: 'app-training-modules',
  imports: [TrainingModulesListComponent, TrainingSubjectsListComponent, TrainingModuleDetailsComponent, TrainingModuleDetailsComponent, TrainingSubjectDetailsComponent, TrainingSubjectDetailsComponent],
  templateUrl: './training-modules.component.html',
  styleUrl: './training-modules.component.css'
})
export class TrainingModulesComponent {
  trainingModuleDataService = inject(TrainingModuleDataService);

  trainingModules: TrainingModule[] = [];
  trainingSubjects: TrainingSubject[] = [];

  constructor(){
    this.trainingModuleDataService.getTrainingModules().subscribe({
      next: (trainingModules) => {
        this.trainingModules = trainingModules;
      },
      error: (err) => {
        alert('Error loading training modules');
        console.error('Error loading training modules', err);
      }
    });

    this.trainingModuleDataService.getTrainingSubjects().subscribe({
      next: (trainingSubjects) => {
        this.trainingSubjects = trainingSubjects;
      },
      error: (err) => {
        alert('Error loading training subjects');
        console.error('Error loading training subjects' , err);
      }
    })

  }
}
