import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from './collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getCollaboratorsIds() : Observable<string[]> {
    return this.httpClient.get<string[]>('https://localhost:7271/api/collaborators/');
  }

  getCollaboratorById(id : string) : Observable<Collaborator> {
    return this.httpClient.get<Collaborator>('https://localhost:7271/api/collaborators/' + id);
  }
}
