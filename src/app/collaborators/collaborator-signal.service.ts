import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Collaborator } from './collaborator';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorSignalService {
  //private httpClient = inject(HttpClient);

  private updateCollaboratorSignal = signal<CollaboratorDetails | undefined>(undefined);
  readonly updatedCollaborator = this.updateCollaboratorSignal.asReadonly();

  private selectedCollaboratorSignal = signal<CollaboratorDetails | undefined>(undefined);
  readonly selectedCollaborator = this.selectedCollaboratorSignal.asReadonly();
  

  // getCollaboratorsIds(): Observable<string[]> {
  //   return this.httpClient.get<string[]>('https://localhost:7271/api/collaborators/');
  // }

  // getCollaboratorById(id: string): Observable<Collaborator> {
  //   return this.httpClient.get<Collaborator>('https://localhost:7271/api/collaborators/' + id);
  // }

  updateCollaborator(updated: CollaboratorDetails) {
    this.updateCollaboratorSignal.set(updated);
  }

  selectCollaborator(selected: CollaboratorDetails){
    this.selectedCollaboratorSignal.set(selected);
  }
}
