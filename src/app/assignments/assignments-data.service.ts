import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignmentDetails } from './assignment-details';
import { AssignmentCreateRequest } from './assigments-form/assignment-create-request';
import { Assignment } from './assignment';

@Injectable({
    providedIn: 'root'
})
export class AssignmentsDataService {
    private http = inject(HttpClient);

    getAssignmentsWithDetails(): Observable<AssignmentDetails[]> {
        return this.http.get<AssignmentDetails[]>('http://localhost:5131/api/assignments/with-details');
    }

    createAssignment(newAssignment: AssignmentCreateRequest): Observable<Assignment> {
        return this.http.post<Assignment>(
            `http://localhost:5151/api/assignments`,
            newAssignment
        );
    }

}
