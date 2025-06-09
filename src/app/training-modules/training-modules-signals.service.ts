import { Injectable, signal } from "@angular/core";
import { TrainingSubject } from "../training-subjects/training-subject";

@Injectable({
  providedIn: 'root'
})
export class TrainingModuleSignalService {
  private updatedTrainingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
  readonly updatedTrainingSubject = this.updatedTrainingSubjectSignal.asReadonly();

  private isCreatingSubjectSignal = signal(false);
  readonly isCreatingSubject = this.isCreatingSubjectSignal.asReadonly();

  private createdSubjectSignal = signal<TrainingSubject | undefined>(undefined);
  readonly createdSubject = this.createdSubjectSignal.asReadonly();

  private isEditingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
  readonly isEditingSubject = this.isEditingSubjectSignal.asReadonly();


  updateTrainingSubject(trainingSubject: TrainingSubject | undefined) {
    this.updatedTrainingSubjectSignal.set(trainingSubject);
    this.cancelEditSubject();
  }

  addTrainingSubject() {
    this.isCreatingSubjectSignal.set(true);
    this.createdSubjectSignal.set(undefined);
  }

  saveTrainingSubject(trainingSubject: TrainingSubject | undefined) {
    this.createdSubjectSignal.set(trainingSubject);
    this.cancelCreateSubject();
  }

  cancelCreateSubject() {
    this.isCreatingSubjectSignal.set(false);
  }

  openEditForm(trainingSubject: TrainingSubject) {
    this.isEditingSubjectSignal.set(trainingSubject);
  }

  cancelEditSubject() {
    this.isEditingSubjectSignal.set(undefined);
  }

  clearUpdatedSubject() { this.updatedTrainingSubjectSignal.set(undefined); }

  clearCreatedSubject() { this.createdSubjectSignal.set(undefined); }
}
