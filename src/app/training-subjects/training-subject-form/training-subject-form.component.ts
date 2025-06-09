import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingSubject } from '../training-subject';
import { TrainingSubjectDataService } from '../training-subjects-data.service';
import { TrainingSubjectSignalsService } from '../training-subjects-signals.service';

@Component({
  selector: 'app-training-subject-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './training-subject-form.component.html',
  styleUrl: './training-subject-form.component.css'
})
export class TrainingSubjectFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private dataService = inject(TrainingSubjectDataService);
  private signalService = inject(TrainingSubjectSignalsService)

  trainingSubjectForm!: FormGroup;
  isEditMode = false;
  trainingSubjectId?: string;

  ngOnInit() {

    const resolved = this.route.snapshot.data['trainingSubject'];

    this.isEditMode = !!resolved;
    this.trainingSubjectId = this.route.snapshot.params['trainingSubjectId'];

    this.trainingSubjectForm = this.fb.group({
      subject: [resolved?.subject ?? '', Validators.required],
      description: [resolved?.description ?? '', Validators.required]
    });
  }

  cancel() {
    this.router.navigate(['/training-subjects']);
  }

  save() {

    if (this.trainingSubjectForm.invalid) return;

    const formValue = this.trainingSubjectForm.value;

    if (this.isEditMode && this.trainingSubjectId) {
      const updatedSubject: TrainingSubject = {
        id: this.trainingSubjectId,
        ...formValue
      };

      this.dataService.updateTrainingSubject(updatedSubject).subscribe({
        next: (res) => {
          this.signalService.updateTrainingSubject(res);
          this.cancel()
        },
        error: (err) => console.error('Update failed:', err)
      });

    } else {
      this.dataService.addTrainingSubject(formValue).subscribe({
        next: (res) => {
          this.signalService.saveTrainingSubject(res);
          this.cancel()
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }


}
