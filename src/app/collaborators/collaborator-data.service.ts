import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AssociationProjectCollaborators, mapToAssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { HolidayPeriod, HolidayPeriodDTO } from './collaborator-holidays/holiday-period';
import { Collaborator } from './collaborator';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';
import { environment } from '../../environments/environment';
import { AssociationCollaboratorProjectCreateRequest } from '../associations-project-collaborator/add-collaborator-project/add-association';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {
  private httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;


  constructor() {
  }

  getCollabs(): Observable<Collaborator[]> {
    return this.httpClient.get<Collaborator[]>(`${this.baseUrl}/collaborators/details`);
  }

  getCollabById(id: string): Observable<Collaborator> {
    return this.httpClient.get<Collaborator>(`${this.baseUrl}/collaborators/${id}/details`);
  }

  createCollaborator(newCollaborator: CollaboratorCreateRequest): Observable<Collaborator> {
    return this.httpClient.post<Collaborator>(`${this.baseUrl}/collaborators`, newCollaborator)
  }

  updateCollaborator(updatedCollaborator: Collaborator) {
    return this.httpClient.put<Collaborator>(`${this.baseUrl}/collaborators`, updatedCollaborator);
  }

  getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriod[]> {
    return this.httpClient
      .get<HolidayPeriodDTO[]>(`${this.baseUrl}/collaborators/${collaboratorId}/holidayplan/holidayperiod`)
      .pipe(
        map((dtoList) =>
          dtoList.map(dto => ({
            id: dto.id,
            periodDate: {
              initDate: dto.periodDate.initDate,
              finalDate: dto.periodDate.finalDate
            }
          }) as HolidayPeriod)
        )
      );
  }

  addHoliday(collabId: string, initDate: string, finalDate: string) {
    return this.httpClient.post<HolidayPeriod>(`${this.baseUrl}/collaborators/${collabId}/holidayplan/holidayperiod`, { initDate: initDate, finalDate: finalDate });
  }

  editHoliday(collaboratorId: string, updatedPeriod: HolidayPeriod) {
    return this.httpClient.put<HolidayPeriod>(`${this.baseUrl}/collaborators/${collaboratorId}/holidayplan/holidayperiod`, updatedPeriod);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaborators[]>(`${this.baseUrl}/collaborators/${id}/associations`);
  }

  createAssociation(id: string, newAssoc: AssociationCollaboratorProjectCreateRequest): Observable<AssociationProjectCollaborators> {
    return this.httpClient.post<AssociationProjectCollaborators>(`${this.baseUrl}/collaborators/${id}/projects`, newAssoc).pipe(
      map(dto => mapToAssociationProjectCollaborators(dto))
    );;
  }

}
