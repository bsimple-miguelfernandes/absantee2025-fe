import { Injectable, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {

  private collaboratorsSignal  = signal<CollaboratorDetails[]>([
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

  readonly collaborators = this.collaboratorsSignal.asReadonly();

  updateCollaborator(updatedCollaborator : CollaboratorDetails){
    this.collaboratorsSignal.update(list =>
      list.map(c => c.id === updatedCollaborator.id ? updatedCollaborator : c)
    );
  }
}
