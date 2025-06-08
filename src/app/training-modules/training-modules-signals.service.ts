import { Injectable, signal } from "@angular/core";
import { TrainingSubject } from "./training-subjects-list/training-subject";

@Injectable({
  providedIn: 'root'
})
export class TrainingModuleSignalService {
  // 🔄 Subject atualizado (para notificar lista ou detalhes)
  private updatedTrainingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
  readonly updatedTrainingSubject = this.updatedTrainingSubjectSignal.asReadonly();

  // ➕ Controlo de criação
  private isCreatingSubjectSignal = signal(false);
  readonly isCreatingSubject = this.isCreatingSubjectSignal.asReadonly();

  private createdSubjectSignal = signal<TrainingSubject | undefined>(undefined);
  readonly createdSubject = this.createdSubjectSignal.asReadonly();

  // ✏️ Controlo de edição
  private isEditingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
  readonly isEditingSubject = this.isEditingSubjectSignal.asReadonly();

  // 👉 Métodos de ação

  updateTrainingSubject(trainingSubject: TrainingSubject) {
    this.updatedTrainingSubjectSignal.set(trainingSubject);
    this.cancelEditSubject();
  }

  addTrainingSubject() {
    this.isCreatingSubjectSignal.set(true);
    this.createdSubjectSignal.set(undefined);
  }

  saveTrainingSubject(trainingSubject: TrainingSubject) {
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
}
