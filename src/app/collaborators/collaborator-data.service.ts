import { inject, Injectable, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { PeriodDate } from '../PeriodDate';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { HolidayPeriod } from './collaborator-holidays/holiday-period';
import { Collaborator } from './collaborator';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {
  private httpClient = inject(HttpClient);

  /* getCollaboratorByEmail(email: string): CollaboratorDetails {
    return this.collaboratorsSignal().find(c => c.email === email)!;
  } */

  getCollabs() : Observable<Collaborator[]>{
    return this.httpClient.get<Collaborator[]>("http://localhost:5073/api/collaborators/details");
  }

  createCollaborator(newCollaborator: CollaboratorCreateRequest): Observable<CollaboratorCreateRequest> {
    return this.httpClient.post<CollaboratorCreateRequest>('http://localhost:5073/api/collaborators', newCollaborator);
  }

  updateCollaborator(updatedCollaborator: Collaborator) {
    return this.httpClient.put<Collaborator>("http://localhost:5073/api/collaborators", updatedCollaborator);
  } 

  getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriod[]> {
    return this.httpClient.get<HolidayPeriod[]>("http://localhost:5073/api/collaborators/"+ collaboratorId + "/holidayplan/holidayperiod");
  };

  editHoliday(collaboratorId: string, updatedPeriod: HolidayPeriod){
    return this.httpClient.put("http://localhost:5073/api/collaborators/"+ collaboratorId + "/holidayplan/holidayperiod", updatedPeriod);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaborators[]>('http://localhost:5073/api/collaborators/' + id + "/associations");
  }
}
