import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingModule } from '../training-module';
import { TrainingModuleDataService } from '../training-modules-data.service';
import { TrainingModuleSignalService } from '../training-modules-signals.service';
import { PeriodDateTime } from '../../PeriodDate';

@Component({
  selector: 'app-training-module-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './training-module-form.component.html',
  styleUrl: './training-module-form.component.css'
})
export class TrainingModuleFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private dataService = inject(TrainingModuleDataService);
  private signalService = inject(TrainingModuleSignalService)

  trainingModuleForm!: FormGroup;
  isEditMode = false;
  trainingModuleId?: string;

  get periods(): FormArray {
    return this.trainingModuleForm.get('periods') as FormArray;
  }

  ngOnInit() {
    const resolved = this.route.snapshot.data['trainingModule'];
    this.isEditMode = !!resolved;
    this.trainingModuleId = this.route.snapshot.params['trainingModuleID'];

    this.trainingModuleForm = this.fb.group({
      id: [resolved?.id ?? '', Validators.required],
      trainingSubjectId: [resolved?.trainingSubjectId ?? '', Validators.required],
      periods: this.fb.array(
        resolved?.periods?.length
          ? resolved.periods.map((p: PeriodDateTime) => this.createPeriodGroup(p))
          : [this.createPeriodGroup()],
        Validators.required
      )
    });
  }

  createPeriodGroup(period: any = {}): FormGroup {
    return this.fb.group({
      _initDate: [period._initDate ?? '', Validators.required],
      _finalDate: [period._finalDate ?? '', Validators.required],
    });
  }

  addPeriod() {
    this.periods.push(this.createPeriodGroup());
  }

  removePeriod(index: number) {
    this.periods.removeAt(index);
  }

  cancel() {
    this.router.navigate(['/training-modules']);
  }

  save() {
  if (this.trainingModuleForm.invalid) return;

  const formValue = this.trainingModuleForm.value;

  const payload: TrainingModule = {
    id: formValue.id,
    trainingSubjectId: formValue.trainingSubjectId,
    periods: formValue.periods.map((p: any) => ({
      _initDate: new Date(p._initDate).toISOString(),
      _finalDate: new Date(p._finalDate).toISOString()
    }))
  };

  if (this.isEditMode && this.trainingModuleId) {
    this.dataService.updateTrainingModule(payload).subscribe({
      next: (res) => {
        this.signalService.clearUpdatedModule();
        this.signalService.updateTrainingModule(res);
        this.cancel()
      },
      error: (err) => console.error('Update failed:', err)
    });

  } else {
    this.dataService.addTrainingModule(payload).subscribe({
      next: (res) => {
        this.signalService.saveTrainingModule(res);
        this.cancel()
      },
      error: (err) => console.error('Add failed:', err)
      // aqui você verá se foi resolvido corretamente
    });
  }
}
}
