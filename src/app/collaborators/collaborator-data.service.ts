import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { HolidayPeriod } from './collaborator-holidays/holiday-period';
import { Collaborator } from './collaborator';
import { CollaboratorCreateRequest } from './collaborators-create/create-collaborator';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {
  private httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  private collaboratorSubject = new BehaviorSubject<Collaborator[]>([]);
  collaborator$ = this.collaboratorSubject.asObservable();


  constructor(private http:HttpClient){
    this.loadCollaborators();
  }

  loadCollaborators(){
    this.httpClient.get<Collaborator[]>(`${this.baseUrl}/collaborators/details`).subscribe({
      next: (collaborators) => this.collaboratorSubject.next(collaborators),
      error: (err) => console.error('Erro ao carregar colaboradores:', err)
    })
  }

  getCollabs(): Observable<Collaborator[]> {
    return this.collaborator$;
  }

  getCollabById(id: string): Observable<Collaborator> {
    return this.httpClient.get<Collaborator>(`${this.baseUrl}/collaborators/${id}/details`);
  }

  createCollaborator(newCollaborator: CollaboratorCreateRequest): Observable<CollaboratorCreateRequest> {
    return this.httpClient.post<CollaboratorCreateRequest>(`${this.baseUrl}/collaborators`, newCollaborator).pipe(
      tap(() => this.loadCollaborators()) 
    )
  }

  updateCollaborator(updatedCollaborator: Collaborator) {
    return this.httpClient.put<Collaborator>(`${this.baseUrl}/collaborators`, updatedCollaborator);
  }

  getCollaboratorHolidays(collaboratorId: string): Observable<HolidayPeriod[]> {
    return this.httpClient.get<HolidayPeriod[]>(`${this.baseUrl}/collaborators/${collaboratorId}/holidayplan/holidayperiod`);
  }

  addHoliday(collabId: string, initDate: string, finalDate: string) {
    return this.httpClient.post<HolidayPeriod>(`${this.baseUrl}/collaborators/${collabId}/holidayplan/holidayperiod`, {initDate: initDate, finalDate: finalDate});
  }

  editHoliday(collaboratorId: string, updatedPeriod: HolidayPeriod){
    return this.httpClient.put<HolidayPeriod>(`${this.baseUrl}/collaborators/${collaboratorId}/holidayplan/holidayperiod`, updatedPeriod);
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaborators[]>(`${this.baseUrl}/collaborators/${id}/associations`);
  }
}
