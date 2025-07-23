import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AssociationProjectCollaborators, AssociationProjectCollaboratorsDTO, mapToAssociationProjectCollaborators } from "../associations-project-collaborator/association-project-collaborator.model";
import { ProjectCreateRequest } from "./models/create-project.model";
import { Injectable } from "@angular/core";
import { AssociationProjectCollaboratorCreateRequest } from "../associations-project-collaborator/add-collaborator-project/add-association";
import { Project } from "./models/project.model";
import { AssociationsProjectCollaboratorComponent } from "../associations-project-collaborator/associations-project-collaborator.component";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })

export class ProjectsDataService {
  private readonly baseUrl = environment.apiBaseUrl;

  private readonly associationsProjectCollaboratorQueryBaseUrl = environment.associationsProjectCollaboratorQueryBaseUrl;
  private readonly associationsProjectCollaboratorCmdBaseUrl = environment.associationsProjectCollaboratorCMDBaseUrl;
  private readonly baseUrlProjectCommand = environment.projectCMDBaseUrl;
  private readonly baseUrlProjectQuery = environment.projectQueryBaseUrl;


  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrlProjectQuery}/Project`)
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrlProjectQuery}/Project/${id}`);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.http.get<AssociationProjectCollaboratorsDTO[]>(`${this.associationsProjectCollaboratorQueryBaseUrl}/project/${id}/details`);
  }

  createProject(newProject: ProjectCreateRequest): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrlProjectCommand}/Project`, newProject);
  }

  updateProject(updatedProject: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrlProjectCommand}/Project`, updatedProject);
  }

  createAssociation(request: AssociationProjectCollaboratorCreateRequest): Observable<AssociationProjectCollaborators> {
    return this.http
      .post<AssociationProjectCollaboratorsDTO>(`${this.associationsProjectCollaboratorCmdBaseUrl}`, request)
      .pipe(map((dto: AssociationProjectCollaboratorsDTO) => mapToAssociationProjectCollaborators(dto)));
  }

}
