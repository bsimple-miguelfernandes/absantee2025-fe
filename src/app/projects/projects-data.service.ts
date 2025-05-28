import { inject, Injectable, signal } from '@angular/core';
import { Project } from './project/project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  private httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getProjects() : Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${this.baseUrl}/Project`);
  }

  getProjectById(id: string): Observable<Project>{
    return this.httpClient.get<Project>(`${this.baseUrl}/Project/${id}`);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaborators[]>(`${this.baseUrl}/Project/${id}/associations`);
  }
}
