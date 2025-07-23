import { Injectable, signal } from "@angular/core";
import { TrainingSubject } from "./training-subject";

@Injectable({
    providedIn: 'root'
})
export class TrainingSubjectSignalsService {
    private updatedTrainingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
    readonly updatedTrainingSubject = this.updatedTrainingSubjectSignal.asReadonly();

    private createdTrainingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
    readonly createdTrainingSubject = this.createdTrainingSubjectSignal.asReadonly();

    addTrainingSubject() {
        this.createdTrainingSubjectSignal.set(undefined);
    }

    updateTrainingSubject(trainingSubject: TrainingSubject | undefined) {
        this.updatedTrainingSubjectSignal.set(trainingSubject);
    }

    saveTrainingSubject(trainingSubject: TrainingSubject | undefined) {
        this.createdTrainingSubjectSignal.set(trainingSubject);
    }

    clearUpdatedSubject() { this.updatedTrainingSubjectSignal.set(undefined); }

    clearCreatedSubject() { this.createdTrainingSubjectSignal.set(undefined); }
}
