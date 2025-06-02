import { Component, effect, inject } from '@angular/core';
import { TrainingModulesListComponent } from "./training-modules-list/training-modules-list.component";
import { TrainingModuleDataService } from './training-modules-data.service';
import { TrainingModule } from './training-module';
import { TrainingSubjectsListComponent } from './training-subjects-list/training-subjects-list.component';
import { TrainingSubject } from './training-subjects-list/training-subject';
import { TrainingModuleDetailsComponent } from "./training-module-details/training-module-details.component";
import { TrainingSubjectDetailsComponent } from "./training-subject-details/training-subject-details.component";
import { TrainingModuleSignalService } from './training-modules-signals.service';
//import { CollaboratorCreateComponent } from "../collaborators/collaborators-create/collaborator-create.component";
import { TrainingSubjectFormComponent } from "./training-subject-form/training-subject-form.component";

@Component({
  selector: 'app-training-modules',
  imports: [TrainingModulesListComponent, TrainingSubjectsListComponent, TrainingModuleDetailsComponent, TrainingModuleDetailsComponent, TrainingSubjectDetailsComponent, TrainingSubjectDetailsComponent, TrainingSubjectFormComponent],
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
    });

     effect(() => {
        const updatedSubject = this.subjectUpdated();
        if(updatedSubject){
          this.trainingModuleDataService.updateTrainingSubject(updatedSubject).subscribe({
            next: (updatedSubject) => {
              this.trainingSubjects = this.trainingSubjects.map(subject => 
                subject.id === updatedSubject.id ? updatedSubject : subject
              );
            },
            error: (err) => console.error('Errors updating training subject', err)
          });
        }

         const createdSubject = this.subjectCreated();
         if (createdSubject){
          this.trainingModuleDataService.addTrainingSubject(createdSubject).subscribe({
            next: (createdSubject) => {
            this.trainingSubjects = [...this.trainingSubjects, createdSubject];
            },
            error: (err) => console.error('Error adding training subject', err)
          });
         }
      });
      

  }
}
