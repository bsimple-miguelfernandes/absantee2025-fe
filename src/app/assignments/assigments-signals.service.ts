import { Injectable, signal } from '@angular/core';
import { AssignmentViewModel } from './assignment.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class AssignmentSignalsService {
    private createdAssignmentSignal = signal<AssignmentViewModel | undefined>(undefined);
    readonly createdAssignment = this.createdAssignmentSignal.asReadonly();

    private updatedAssignmentSignal = signal<AssignmentViewModel | undefined>(undefined);
    readonly updatedAssignment = this.updatedAssignmentSignal.asReadonly();

    saveCreatedAssignment(assignment: AssignmentViewModel | undefined) {
        this.createdAssignmentSignal.set(assignment);
    }

    updateAssignment(assignment: AssignmentViewModel | undefined) {
        this.updatedAssignmentSignal.set(assignment);
    }

    clearCreatedAssignment() {
        this.createdAssignmentSignal.set(undefined);
    }

    clearUpdatedAssignment() {
        this.updatedAssignmentSignal.set(undefined);
    }
}
