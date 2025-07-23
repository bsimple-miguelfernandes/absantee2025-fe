import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AssociationProjectCollaborators, AssociationProjectCollaboratorsDTO, mapToAssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { HolidayPeriod, HolidayPeriodDTO } from './collaborator-holidays/holiday-period';
import { Collaborator } from './collaborator';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';
import { environment } from '../../environments/environment';
import { AssociationProjectCollaboratorCreateRequest } from '../associations-project-collaborator/add-collaborator-project/add-association';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {
  private httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly associationsProjectCollaboratorQueryBaseUrl = environment.associationsProjectCollaboratorQueryBaseUrl;
  private readonly associationsProjectCollaboratorCmdBaseUrl = environment.associationsProjectCollaboratorCMDBaseUrl;
  private readonly collaboratorCMDBaseUrl = environment.collaboratorCMDBaseURL;
  private readonly collaboratorQueryBaseUrl = environment.collaboratorQueryBaseURL;
  private readonly userQueryBaseUrl = environment.userQueryBaseUrl;
  private readonly userCmdBaseUrl = environment.userCmdBaseUrl;
  private readonly holidaysCmdBaseUrl = environment.holidaysCmdBaseUrl;
  private readonly holidaysQueryBaseUrl = environment.holidaysQueryBaseUrl;


  constructor() {
  }

  getCollabs(): Observable<Collaborator[]> {
    return this.httpClient.get<Collaborator[]>(`${this.collaboratorQueryBaseUrl}/details`);
  }

  getCollabById(id: string): Observable<Collaborator> {
    return this.httpClient.get<Collaborator>(`${this.collaboratorQueryBaseUrl}/${id}/details`);
  }

  createCollaborator(newCollaborator: CollaboratorCreateRequest): Observable<Collaborator> {
    return this.httpClient.post<Collaborator>(`${this.collaboratorCMDBaseUrl}`, newCollaborator)
  }

  updateUser(updatedCollaborator: Collaborator) {
    var updatedUser: User = {
      id: updatedCollaborator.userId,
      names: updatedCollaborator.names,
      surnames: updatedCollaborator.surnames,
      email: updatedCollaborator.email,
      Period: updatedCollaborator.userPeriod
    }

    return this.httpClient.patch<User>(`${this.userCmdBaseUrl}/${updatedCollaborator.userId}`, updatedUser);
  }

  updateCollaborator(updatedCollaborator: Collaborator) {
    return this.httpClient.put<Collaborator>(`${this.collaboratorCMDBaseUrl}`, updatedCollaborator);
  }

  getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriodDTO[]> {
    return this.httpClient
      .get<HolidayPeriodDTO[]>(`${this.holidaysQueryBaseUrl}/${collaboratorId}`);
  }

  addHoliday(collaboratorId: string, initDate: string, finalDate: string) {
    return this.httpClient.post<HolidayPeriod>(`${this.holidaysCmdBaseUrl}/${collaboratorId}/holidayperiod`, { initDate: initDate, finalDate: finalDate });
  }

  editHoliday(collaboratorId: string, updatedPeriod: HolidayPeriod) {
    return this.httpClient.put<HolidayPeriod>(`${this.holidaysCmdBaseUrl}/${collaboratorId}/holidayperiod`, updatedPeriod);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaboratorsDTO[]>(`${this.associationsProjectCollaboratorQueryBaseUrl}/collaborator/${id}/details`).pipe(
      map(dtoList => dtoList.map(dto => mapToAssociationProjectCollaborators(dto)))
    );
  }

  createAssociation(request: AssociationProjectCollaboratorCreateRequest): Observable<AssociationProjectCollaborators> {
    return this.httpClient
      .post<AssociationProjectCollaboratorsDTO>(`${this.associationsProjectCollaboratorCmdBaseUrl}`, request)
      .pipe(map((dto: AssociationProjectCollaboratorsDTO) => mapToAssociationProjectCollaborators(dto)));
  }

}
