import { inject, Injectable, signal } from '@angular/core';
import { Project } from './project/project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  private httpClient = inject(HttpClient);

  getProjects() : Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:5073/api/Project');
  }

  getProjectById(id: string): Observable<Project>{
    return this.httpClient.get<Project>('http://localhost:5073/api/Project/' + id);
  }

  //getCollaborators(id: string): Observable
}
