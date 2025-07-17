import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AssignmentsDataService } from './assignments/assignments-data.service';
import { AssignmentDetails } from './assignments/assignment-details';

@Injectable({ providedIn: 'root' })
export class AssignmentDetailsResolver implements Resolve<AssignmentDetails> {
    constructor(private service: AssignmentsDataService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<AssignmentDetails> {
        const id = route.paramMap.get('assignmentId')!;
        return this.service.getAssignmentById(id);
    }
}
