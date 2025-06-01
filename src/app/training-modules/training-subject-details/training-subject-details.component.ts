import { Component, inject } from '@angular/core';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  formMode = false;
  trainingSubjectForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.trainingSubjectForm = this.fb.group({
      subject:['', Validators.required],
      description: [''],
    });
  }

  close(){
    this.trainingModuleSignalService.disableSubjectDetails();
  }

  edit(trainingSubject: TrainingSubject){
    this.formMode = true;
    this.trainingSubjectForm.patchValue(trainingSubject);
  }

  cancel(){
    this.formMode = false;
  }

  save(){
    if(this.trainingSubjectForm.valid){
      const updated = {...this.trainingSubject(), ...this.trainingSubjectForm.value};
      this.trainingModuleSignalService.updateTrainingSubject(updated);
      this.formMode = false;
      this.trainingModuleSignalService.selectTrainingSubject(updated);
    }
  }
}
