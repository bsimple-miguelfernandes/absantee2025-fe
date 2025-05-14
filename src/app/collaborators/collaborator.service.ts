import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Collaborator } from './collaborator';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private httpClient = inject(HttpClient);
  private collaborators = signal<CollaboratorDetails[]>([
    {
      id: "1",
      names: "Alice",
      surnames: "Johnson",
      email: "alice.johnson@example.com",
      periodDateTime: {
        _initDate: new Date("2019-06-10"),
        _finalDate: new Date("2025-12-31")
      }
    },
    {
      id: "2",
      names: "Bob",
      surnames: "Martinez",
      email: "bob.martinez@example.com",
      periodDateTime: {
        _initDate: new Date("2021-02-01"),
        _finalDate: new Date("2024-07-30")
      }
    },
    {
      id: "3",
      names: "Clara",
      surnames: "Nguyen",
      email: "clara.nguyen@example.com",
      periodDateTime: {
        _initDate: new Date("2020-04-15"),
        _finalDate: new Date("2030-09-01")
      }
    }
  ]);

  readonly getCollaborators = this.collaborators.asReadonly();

  constructor() { }

  getCollaboratorsIds(): Observable<string[]> {
    return this.httpClient.get<string[]>('https://localhost:7271/api/collaborators/');
  }

  getCollaboratorById(id: string): Observable<Collaborator> {
    return this.httpClient.get<Collaborator>('https://localhost:7271/api/collaborators/' + id);
  }

  updateCollaborator(updated: CollaboratorDetails) {
    this.collaborators.update(list => list.map(c => c.id === updated.id ? updated : c));
  }
}
