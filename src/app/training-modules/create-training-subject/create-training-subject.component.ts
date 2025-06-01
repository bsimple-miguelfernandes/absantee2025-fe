import { Component, inject } from '@angular/core';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-training-subject',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-training-subject.component.html',
  styleUrl: './create-training-subject.component.css'
})
export class CreateTrainingSubjectComponent {
  trainingModuleSignalService = inject(TrainingModuleSignalService);

  isCreatingTrainingSubject = this.trainingModuleSignalService.isCreatingSubject;

  trainingSubjectForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.trainingSubjectForm = this.fb.group({
      subject:['', Validators.required],
      description: [''],
    });
  }

  add(){
    if(this.trainingSubjectForm.valid){
      const trainingSubject = {...this.trainingSubjectForm.value};
      this.trainingModuleSignalService.saveTrainingSubject(trainingSubject);
      this.trainingSubjectForm.reset();
    }
  }

  cancel(){
    this.trainingModuleSignalService.cancelCreateSubject();
  }
}
