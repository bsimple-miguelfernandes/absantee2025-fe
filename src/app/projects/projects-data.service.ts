import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { Project } from "./project/project";
import { HttpClient } from "@angular/common/http";
import { AssociationProjectCollaborators } from "../associations-project-collaborator/association-project-collaborator.model";
import { ProjectCreateRequest } from "./create-project/create-project";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' }) // <-- ADICIONE ISSO

export class ProjectsDataService {
  private readonly baseUrl = environment.apiBaseUrl;

  private projectSubject = new BehaviorSubject<Project[]>([]);
  project$ = this.projectSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProjects(); // <- agora usa this.http que é interceptável
  }

  loadProjects() {
    this.http.get<Project[]>(`${this.baseUrl}/Project`).subscribe({
      next: (projects) => this.projectSubject.next(projects),
      error: (err) => console.error('Erro ao carregar projectos', err)
    });
  }

  getProjects(): Observable<Project[]> {
    return this.project$;
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/Project/${id}`);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.http.get<AssociationProjectCollaborators[]>(`${this.baseUrl}/Project/${id}/associations`);
  }

  createProject(newProject: ProjectCreateRequest): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/Project`, newProject).pipe(
      tap((createdProject) => {
        const currentProjects = this.projectSubject.getValue();
        this.projectSubject.next([...currentProjects, createdProject]);
      })
    );
  }
}
