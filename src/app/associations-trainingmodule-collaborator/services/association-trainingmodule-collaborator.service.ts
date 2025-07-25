import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssociationTrainingModuleCollaboratorsDTO } from '../models/association-trainingmodule-collaborator.model';
import { Observable, of } from 'rxjs';
import { AssociationTrainingModuleCollaboratorCreateRequest } from '../create-association-trainingmodule-collaborator/models/add-association-trainingmodule-collaborator.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociationTrainingmoduleCollaboratorService {

  private readonly associationsTrainingModuleCollaboratorCmdBaseUrl = environment.associationTrainingModuleCollaboratorCMDBaseUrl;
  private readonly associationsTrainingModuleCollaboratorQueryBaseUrl = environment.associationTrainingModuleCollaboratorQUERYBaseUrl;

  constructor(private httpClient: HttpClient) { }

  createAssociationTMC(newAssoc: AssociationTrainingModuleCollaboratorCreateRequest): Observable<AssociationTrainingModuleCollaboratorsDTO> {
    return this.httpClient.post<AssociationTrainingModuleCollaboratorsDTO>(`${this.associationsTrainingModuleCollaboratorCmdBaseUrl}/associationsTMC`, { CollaboratorId: newAssoc.collaboratorId, TrainingModuleId: newAssoc.trainingModuleId, PeriodDate: newAssoc.periodDate });
  }

  removeAssociationTMC(id: string) {
    return this.httpClient.delete(`${this.associationsTrainingModuleCollaboratorCmdBaseUrl}/associationsTMC/${id}`);
  }

  getAssociationsByCollabTMC(id: string): Observable<AssociationTrainingModuleCollaboratorsDTO[]> {

    return this.httpClient.get<AssociationTrainingModuleCollaboratorsDTO[]>(`${this.associationsTrainingModuleCollaboratorQueryBaseUrl}/associationsTMC/by-collaborator/${id}`);
  }

  getAssociationsByTrainingModuleTMC(id: string): Observable<AssociationTrainingModuleCollaboratorsDTO[]> {

    return this.httpClient.get<AssociationTrainingModuleCollaboratorsDTO[]>(`${this.associationsTrainingModuleCollaboratorQueryBaseUrl}/associationsTMC/by-trainingModule/${id}`);
  }
}
