import { Component, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainingModuleSignalService } from '../training-modules-signals.service';

@Component({
  selector: 'app-training-subject-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './training-subject-form.component.html',
  styleUrl: './training-subject-form.component.css'
})
export class TrainingSubjectFormComponent {
  trainingModuleSignalsService = inject(TrainingModuleSignalService)
  isEditingTrainingSubjectForm = this.trainingModuleSignalsService.isEditingSubject;
  isCreatingForm = this.trainingModuleSignalsService.isCreatingSubject;

  trainingSubjectForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.trainingSubjectForm = this.fb.group({
      subject:['', Validators.required],
      description: [''],
    });

    effect(() => {
  const subject = this.isEditingTrainingSubjectForm();
  if (subject) {
    this.trainingSubjectForm.patchValue(subject);
  } else {
    this.trainingSubjectForm.reset();
  }
});

  }

    cancel(){
      this.trainingModuleSignalsService.cancelCreateSubject();
      this.trainingModuleSignalsService.cancelEditSubject();
    }

    save() {
      if (this.trainingSubjectForm.valid) {
        const formValue = this.trainingSubjectForm.value;

        const trainingSubject = this.isEditingTrainingSubjectForm()
          ? { ...this.isEditingTrainingSubjectForm(), ...formValue }
          : formValue;

      if (this.isCreatingForm()) {
      this.trainingModuleSignalsService.saveTrainingSubject(trainingSubject);
      } else if (this.isEditingTrainingSubjectForm()) {
      this.trainingModuleSignalsService.updateTrainingSubject(trainingSubject);
      }

    this.trainingSubjectForm.reset();
  }
}
}
