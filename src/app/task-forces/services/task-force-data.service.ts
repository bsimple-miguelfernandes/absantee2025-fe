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
  getSubjects() {
    return [{ id: '1', description: 'Subject A' }, { id: '2', description: 'Subject B' }, { id: '3', description: 'Subject C' }];
  }

  getProjects() {
    return [{ id: '1', title: 'Project A' }, { id: '2', title: 'Project B' }, { id: '3', title: 'Project C' }]
  }

  getCollaborators() {
    return [
      { id: '1', email: 'Alice@email.com' },
      { id: '2', email: 'Bob@email.com' },
      { id: '3', email: 'Charlie@email.com' },
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
