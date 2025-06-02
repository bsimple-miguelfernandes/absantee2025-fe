import { inject, Injectable, signal } from '@angular/core';
import { Project } from './project/project';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { environment } from '../../environments/environment';
import { ProjectCreateRequest } from './create-project/create-project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  private httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;


  private projectSubject = new BehaviorSubject<Project[]>([]);
  project$ = this.projectSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  loadProjects() {
    this.httpClient.get<Project[]>(`${this.baseUrl}/Project`).subscribe({
      next: (projects) => this.projectSubject.next(projects),
      error: (err) => console.error('Erro ao carregar projectos', err)
    })

  }

  getProjects() : Observable<Project[]> {
    return this.project$;
      }

  getProjectById(id: string): Observable<Project>{
    return this.httpClient.get<Project>(`${this.baseUrl}/Project/${id}`);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaborators[]>(`${this.baseUrl}/Project/${id}/associations`);
  }

  createProject(newProject: ProjectCreateRequest): Observable<Project> {
  return this.httpClient.post<Project>(`${this.baseUrl}/Project`, newProject).pipe(
    tap((createdProject) => {
      const currentProjects = this.projectSubject.getValue();
      this.projectSubject.next([...currentProjects, createdProject]);
    })
  );
}
}
