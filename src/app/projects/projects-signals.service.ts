import { Injectable, signal } from '@angular/core';
import { Project } from './project/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsSignalsService {
  private projectSelectedSignal = signal<Project | undefined>(undefined);
  projectSelected = this.projectSelectedSignal.asReadonly();

  private projectCollaboratorsSelectedSignal = signal<Project | undefined>(undefined);
  projectCollaboratorSelected = this.projectCollaboratorsSelectedSignal.asReadonly();

  selectProject(selected: Project){
    this.projectCollaboratorsSelectedSignal.set(undefined);
    this.projectSelectedSignal.set(selected);
  }

  selectProjectCollaborators(selected: Project){
    this.projectSelectedSignal.set(undefined);
    this.projectCollaboratorsSelectedSignal.set(selected);
  }
}
