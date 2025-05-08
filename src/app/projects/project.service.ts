import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddAssociationProjectCollaborator, Project } from './project/project';
import { Observable } from 'rxjs';
import { Collaborator } from '../collaborators/collaborator';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private httpClient = inject(HttpClient);
  constructor() { }

  getProjects() : Observable<Project[]> {
    return this.httpClient.get<Project[]>('https://localhost:7271/api/Project');
  }

  getProject(id : string) : Observable<Project> {
    return this.httpClient.get<Project>('https://localhost:7271/api/Project/' + id);
  }

  getProjectCollaborators(id : string) : Observable<Collaborator[]> {
    return this.httpClient.get<Collaborator[]>('https://localhost:7271/api/Project/' + id + '/collaborators');
  }

  addCollaboratorToProject(id: string, association : AddAssociationProjectCollaborator) {
    return this.httpClient.post('https://localhost:7271/api/Project/' + id + '/collaborators', association);
  }
}
