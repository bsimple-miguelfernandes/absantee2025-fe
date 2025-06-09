import { Component, effect, inject } from '@angular/core';
import { TrainingModulesListComponent } from "./training-modules-list/training-modules-list.component";
import { TrainingModuleDataService } from './training-modules-data.service';
import { TrainingModule } from './training-module';
import { TrainingSubjectsListComponent } from './training-subjects-list/training-subjects-list.component';
import { TrainingSubject } from './training-subjects-list/training-subject';
import { TrainingSubjectDetailsComponent } from "./training-subject-details/training-subject-details.component";
import { TrainingModuleSignalService } from './training-modules-signals.service';
//import { CollaboratorCreateComponent } from "../collaborators/collaborators-create/collaborator-create.component";
import { TrainingSubjectFormComponent } from "./training-subject-form/training-subject-form.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-training-modules',
  imports: [TrainingModulesListComponent, TrainingSubjectsListComponent, TrainingSubjectDetailsComponent, TrainingSubjectDetailsComponent, TrainingSubjectFormComponent, RouterOutlet],
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
  /* ---------- UPDATE ---------- */
  const upd = this.subjectUpdated();
  if (upd) {
    // actualiza imediatamente a lista no UI
    this.trainingSubjects = this.trainingSubjects.map(s =>
      s.id === upd.id ? upd : s
    );
    this.trainingModuleSignalService.clearUpdatedSubject();   // <- evita novo ciclo
  }

  /* ---------- CREATE ---------- */
  const crt = this.subjectCreated();
  if (crt) {
    this.trainingSubjects = [...this.trainingSubjects, crt];
    this.trainingModuleSignalService.clearCreatedSubject();    // <- idem
  }
});





  }
}
