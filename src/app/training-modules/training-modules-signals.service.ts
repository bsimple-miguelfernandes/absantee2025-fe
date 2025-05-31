import { Injectable, signal } from "@angular/core";
import { TrainingModule } from "./training-module";
import { TrainingSubject } from "./training-subjects-list/training-subject";

@Injectable({
    providedIn:'root'
})
export class TrainingModuleSignalService {
    private selectedTrainingModuleSignal = signal<TrainingModule | undefined>(undefined);
    readonly selectedTrainingModule = this.selectedTrainingModuleSignal.asReadonly();

    private selectedTrainingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
    readonly selectedTrainingSubject = this.selectedTrainingSubjectSignal.asReadonly();

    selectTrainingModule(trainingModule: TrainingModule){
        this.selectedTrainingModuleSignal.set(trainingModule);
        console.log(this.selectedTrainingModuleSignal);
    }

    selectTrainingSubject(trainingSubject: TrainingSubject){
        this.selectedTrainingSubjectSignal.set(trainingSubject);
    }
}