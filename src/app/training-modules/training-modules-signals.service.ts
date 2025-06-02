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

    private updatedTrainingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
    readonly updatedTrainingSubject = this.updatedTrainingSubjectSignal.asReadonly();

    private isCreatingSubjectSignal = signal(false);
    readonly isCreatingSubject = this.isCreatingSubjectSignal.asReadonly();

    private isEditingSubjectSignal = signal<TrainingSubject | undefined>(undefined);
    readonly isEditingSubject = this.isEditingSubjectSignal.asReadonly();

    private createdSubjectSignal = signal<TrainingSubject | undefined>(undefined);
    readonly createdSubject = this.createdSubjectSignal.asReadonly();

    selectTrainingModule(trainingModule: TrainingModule){
        this.selectedTrainingModuleSignal.set(trainingModule);
        console.log(this.selectedTrainingModuleSignal);
    }

    selectTrainingSubject(trainingSubject: TrainingSubject){
        this.selectedTrainingSubjectSignal.set(trainingSubject);
    }

    disableSubjectDetails(){
        this.selectedTrainingSubjectSignal.set(undefined);
    }

    updateTrainingSubject(trainingSubject: TrainingSubject){
        this.updatedTrainingSubjectSignal.set(trainingSubject);
        this.cancelEditSubject();
    }

    addTrainingSubject(){
        this.isCreatingSubjectSignal.set(true);
        this.createdSubjectSignal.set(undefined);
    }

    saveTrainingSubject(trainingSubject: TrainingSubject){
        this.createdSubjectSignal.set(trainingSubject);
        this.cancelCreateSubject();
    }

    cancelCreateSubject(){
        this.isCreatingSubjectSignal.set(false);
    }

    cancelEditSubject(){
        this.isEditingSubjectSignal.set(undefined);
    }

    openEditForm(trainingSubject: TrainingSubject){
        this.isEditingSubjectSignal.set(trainingSubject);
    }
}