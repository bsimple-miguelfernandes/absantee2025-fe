import { Injectable, signal } from '@angular/core';
import { AssignmentViewModel } from './assignment.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class AssignmentSignalsService {
    private assignmentsSignal = signal<AssignmentViewModel[]>([]);
    readonly assignments = this.assignmentsSignal.asReadonly();

    setAssignments(assignments: AssignmentViewModel[]) {
        this.assignmentsSignal.set(assignments);
    }

    clearAssignments() {
        this.assignmentsSignal.set([]);
    }
}
