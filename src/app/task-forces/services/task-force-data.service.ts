import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskForceDTO, TaskForceCollaboratorDTO, TaskForceDTO, UpdateDTO, UpdateTaskForceCollaboratorsDTO } from '../models/task-force.model';

@Injectable({
  providedIn: 'root'
})
export class TaskForceDataService {

  constructor(private http: HttpClient) { }

  // ---- Methods for testing ----
  getProjects() {
    return [
      { id: '69ed76c4-b927-4c3e-b56f-d05e780d29b1', title: 'Project A', initDate: "2025-06-17", endDate: "2027-06-17" },
      { id: '31808c80-5319-4c59-9de4-0202ff499e2f', title: 'Project B', initDate: "2025-06-17", endDate: "2027-06-17" },
    ]
  }

  getCollaborators() {
    return [
      { id: 'ffdc5192-4ec3-4f3f-9b84-497729645bc3', email: 'Alice@email.com', initDate: '2025-07-20 15:18:48.108+01', endDate: '2025-12-17 14:18:48.108+00' },
      { id: '72d3eac4-5e00-4c3f-849e-67b6e94b4bfc', email: 'Bob@email.com', initDate: '2025-07-20 15:18:48.108+01', endDate: '2025-12-17 14:18:48.108+00' },
      { id: 'b6ed3ff9-b80b-4e2e-9e52-e2b3c6e92ad2', email: 'Charlie@email.com', initDate: '2025-07-20 15:18:48.108+01', endDate: '2025-12-17 14:18:48.108+00' },
    ]
  }

  createTaskForce(create: CreateTaskForceDTO): Observable<TaskForceDTO> {
    return this.http.post<TaskForceDTO>(`http://localhost:5154/api/taskForces`, create);
  }

  updateTaskForceDetails(id: string, update: UpdateDTO): Observable<TaskForceDTO> {
    return this.http.patch<TaskForceDTO>(`http://localhost:5154/api/taskForces/${id}`, update);
  }

  addCollaboratorToTaskForce(id: string, update: UpdateTaskForceCollaboratorsDTO): Observable<TaskForceCollaboratorDTO[]> {
    return this.http.patch<TaskForceCollaboratorDTO[]>(`http://localhost:5154/api/taskForces/${id}/collaborators/add`, update);
  }

  removeCollaboratorToTaskForce(id: string, update: UpdateTaskForceCollaboratorsDTO): Observable<TaskForceCollaboratorDTO[]> {
    return this.http.patch<TaskForceCollaboratorDTO[]>(`http://localhost:5154/api/taskForces/${id}/collaborators/remove`, update);
  }

  getAllTaskForces(): Observable<TaskForceDTO[]> {
    return this.http.get<TaskForceDTO[]>(`http://localhost:5191/api/taskForces`);
  }

  getTaskForcesByProject(projectId: string): Observable<TaskForceDTO[]> {
    return this.http.get<TaskForceDTO[]>(`http://localhost:5191/api/taskForces/project/${projectId}`);
  }

  getTaskForcesByPeriod(initDate: Date, endDate: Date): Observable<TaskForceDTO[]> {
    return this.http.get<TaskForceDTO[]>(`http://localhost:5191/api/taskForces/period?initDate=${initDate}&endDate=${endDate}`);
  }

  getTaskForcesByDescription(description: string): Observable<TaskForceDTO[]> {
    return this.http.get<TaskForceDTO[]>(`http://localhost:5191/api/taskForces/description?value=${description}`);
  }

  getTaskForcesBySubjectId(subjectId: string): Observable<TaskForceDTO[]> {
    return this.http.get<TaskForceDTO[]>(`http://localhost:5191/api/taskForces/subject/${subjectId}`);
  }

  getTaskForcesCollaboratorByCollaboratorId(collaboratorId: string): Observable<TaskForceCollaboratorDTO[]> {
    return this.http.get<TaskForceCollaboratorDTO[]>(`http://localhost:5191/api/taskForces/collaborator/${collaboratorId}`);
  }

  getTaskForcesCollaboratorByTaskForceId(taskForceId: string): Observable<TaskForceCollaboratorDTO[]> {
    return this.http.get<TaskForceCollaboratorDTO[]>(`http://localhost:5191/api/taskForces/${taskForceId}/collaborators`);
  }

}
