import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Assignment } from "./assignment";

@Injectable({
    providedIn: 'root'
})
export class AssignmentsDataService {
    private httpClient = inject(HttpClient);

    constructor() { }

    getAssignments(): Observable<Assignment[]> {
        return this.httpClient.get<Assignment[]>(`http://localhost:5131/api/assignments`);
    }

    getAssignmentById(id: string): Observable<Assignment> {
        return this.httpClient.get<Assignment>(`http://localhost:5131/api/assignments/${id}`);
    }

    getAssignmentsByCollaboratorId(id: string): Observable<Assignment[]> {
        return this.httpClient.get<Assignment[]>(`http://localhost:5131/api/assignments/collaborator/${id}`);
    }

    getAssignmentsByDeviceId(id: string): Observable<Assignment[]> {
        return this.httpClient.get<Assignment[]>(`http://localhost:5131/api/assignments/device/${id}`);
    }

}
