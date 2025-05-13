import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collaborator } from './collaborator';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getCollaboratorsIds() : Observable<string[]> {
    return this.httpClient.get<string[]>('https://localhost:7271/api/collaborators/');
  }

  getCollaborators() : CollaboratorDetails[] {
    return [
      {
        id: "1",
        names: "Alice",
        surnames: "Johnson",
        email: "alice.johnson@example.com",
        periodDateTime: {
          _initDate: new Date(2019, 5, 10),
          _finalDate: new Date(2025, 11, 31)
        }
      },
      {
        id: "2",
        names: "Bob",
        surnames: "Martinez",
        email: "bob.martinez@example.com",
        periodDateTime: {
          _initDate: new Date(2021, 1, 1),
          _finalDate: new Date(2024, 6, 30)
        }
      },
      {
        id: "3",
        names: "Clara",
        surnames: "Nguyen",
        email: "clara.nguyen@example.com",
        periodDateTime: {
          _initDate: new Date(2020, 3, 15),
          _finalDate: new Date(2030, 8, 1)
        }
      }
    ]
  }

  getCollaboratorById(id : string) : Observable<Collaborator> {
    return this.httpClient.get<Collaborator>('https://localhost:7271/api/collaborators/' + id);
  }
}
