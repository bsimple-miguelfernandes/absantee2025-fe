import { Injectable, signal } from '@angular/core';
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

  private selectedCollaboratorHolidaysSignal = signal<CollaboratorDetails | undefined>(undefined);
  readonly selectedCollaboratorHoliday = this.selectedCollaboratorHolidaysSignal.asReadonly();
  

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
    this.selectedCollaboratorHolidaysSignal.set(undefined);
    this.selectedCollaboratorSignal.set(selected);
  }

  selectCollaboratorHolidays(selected: CollaboratorDetails){
    this.selectedCollaboratorSignal.set(undefined);
    this.selectedCollaboratorHolidaysSignal.set(selected);
  }
}
