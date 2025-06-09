import { Component, effect, inject } from '@angular/core';
import { TrainingModulesListComponent } from "./training-modules-list/training-modules-list.component";
import { TrainingModuleDataService } from './training-modules-data.service';
import { TrainingModule } from './training-module';
import { TrainingSubjectsListComponent } from './training-subjects-list/training-subjects-list.component';
import { TrainingSubject } from './training-subjects-list/training-subject';
import { TrainingModuleSignalService } from './training-modules-signals.service';
//import { CollaboratorCreateComponent } from "../collaborators/collaborators-create/collaborator-create.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-training-modules',
  imports: [TrainingModulesListComponent, TrainingSubjectsListComponent, RouterOutlet],
  templateUrl: './training-modules.component.html',
  styleUrl: './training-modules.component.css'
})
export class TrainingModulesComponent {
  trainingModuleDataService = inject(TrainingModuleDataService);
  trainingModuleSignalService = inject(TrainingModuleSignalService)
  subjectUpdated = this.trainingModuleSignalService.updatedTrainingSubject;
  subjectCreated = this.trainingModuleSignalService.createdSubject;

  trainingModules: TrainingModule[] = [];
  trainingSubjects: TrainingSubject[] = [];

  constructor() {
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
        console.error('Error loading training subjects', err);
      }
    });

    effect(() => {
      const upd = this.subjectUpdated();
      if (upd) {
        this.trainingSubjects = this.trainingSubjects.map(s =>
          s.id === upd.id ? upd : s
        );
        this.trainingModuleSignalService.clearUpdatedSubject();
      }

      const crt = this.subjectCreated();
      if (crt) {
        this.trainingSubjects = [...this.trainingSubjects, crt];
        this.trainingModuleSignalService.clearCreatedSubject();
      }
    });





  }
}
