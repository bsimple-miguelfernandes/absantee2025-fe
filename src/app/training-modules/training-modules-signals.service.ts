import { Injectable, signal } from "@angular/core";
import { TrainingModule } from "./training-module";

@Injectable({
    providedIn: 'root'
})
export class TrainingModuleSignalService {
    private updatedTrainingModuleSignal = signal<TrainingModule | undefined>(undefined);
    readonly updatedTrainingModule = this.updatedTrainingModuleSignal.asReadonly();

    private createdTrainingModuleSignal = signal<TrainingModule | undefined>(undefined);
    readonly createdTrainingModule = this.createdTrainingModuleSignal.asReadonly();

    addTrainingModule() {
        this.createdTrainingModuleSignal.set(undefined);
    }

    updateTrainingModule(trainingModule: TrainingModule | undefined) {
        this.updatedTrainingModuleSignal.set(trainingModule);
    }

    saveTrainingModule(trainingModule: TrainingModule | undefined) {
        this.createdTrainingModuleSignal.set(trainingModule);
    }

    clearUpdatedModule() { this.updatedTrainingModuleSignal.set(undefined); }

    clearCreatedModule() { this.createdTrainingModuleSignal.set(undefined); }
}
