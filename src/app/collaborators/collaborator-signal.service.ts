import { Injectable, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { Collaborator } from './collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorSignalService {
  //private httpClient = inject(HttpClient);

  private updateCollaboratorSignal = signal<Collaborator | undefined>(undefined);
  readonly updatedCollaborator = this.updateCollaboratorSignal.asReadonly();

  private selectedCollaboratorSignal = signal<Collaborator | undefined>(undefined);
  readonly selectedCollaborator = this.selectedCollaboratorSignal.asReadonly();

  private selectedCollaboratorHolidaysSignal = signal<Collaborator | undefined>(undefined);
  readonly selectedCollaboratorHoliday = this.selectedCollaboratorHolidaysSignal.asReadonly();

  private selectedCollaboratorProjectsSignal = signal<Collaborator | undefined>(undefined);
  readonly selectedCollaboratorProjects = this.selectedCollaboratorProjectsSignal.asReadonly();

  private isCreatingCollaboratorSignal = signal(false);
  readonly isCreatingCollaborator = this.isCreatingCollaboratorSignal.asReadonly();
  

  // getCollaboratorsIds(): Observable<string[]> {
  //   return this.httpClient.get<string[]>('https://localhost:7271/api/collaborators/');
  // }

  // getCollaboratorById(id: string): Observable<Collaborator> {
  //   return this.httpClient.get<Collaborator>('https://localhost:7271/api/collaborators/' + id);
  // }

  updateCollaborator(updated: Collaborator) {
    this.updateCollaboratorSignal.set(updated);
  }

  startCreateCollaborator() {
    this.isCreatingCollaboratorSignal.set(true);
  }

  cancelCreateCollaborator() {
    this.isCreatingCollaboratorSignal.set(false);
  }

  selectCollaborator(selected: Collaborator | undefined){
    this.selectedCollaboratorHolidaysSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(undefined);
    this.selectedCollaboratorSignal.set(selected);
  }

  selectCollaboratorHolidays(selected: Collaborator | undefined){
    this.selectedCollaboratorSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(undefined);
    this.selectedCollaboratorHolidaysSignal.set(selected);
  }

  selectCollaboratorProjects(selected: Collaborator | undefined){
    this.selectedCollaboratorSignal.set(undefined);
    this.selectedCollaboratorHolidaysSignal.set(undefined);
    this.selectedCollaboratorProjectsSignal.set(selected);
  }
}
