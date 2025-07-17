import { Injectable, signal } from '@angular/core';
import { AssignmentViewModel } from './assignment.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class AssignmentSignalsService {
    private createdAssignmentSignal = signal<AssignmentViewModel | undefined>(undefined);
    readonly createdAssignment = this.createdAssignmentSignal.asReadonly();

    saveAssignment(assignment: AssignmentViewModel | undefined) {
        this.createdAssignmentSignal.set(assignment);
    }

    clearCreatedAssignment() {
        this.createdAssignmentSignal.set(undefined);
    }
}
