import { Injectable, signal } from '@angular/core';
import { Project } from './project/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsSignalsService {
  private projectSelectedSignal = signal<Project | undefined>(undefined);
  projectSelected = this.projectSelectedSignal.asReadonly();

  private projectCollaboratorsSelectedSignal = signal<Project | undefined>(undefined);
  readonly projectCollaboratorSelected = this.projectCollaboratorsSelectedSignal.asReadonly();
  private isCreatingProjectSignal = signal(false);
  readonly isCreatingProject = this.isCreatingProjectSignal.asReadonly();

  private projectCreatedSignal = signal<Project | undefined>(undefined);
  readonly projectCreated = this.projectCreatedSignal.asReadonly();

  startCreateProject() {
    this.isCreatingProjectSignal.set(true);
  }

  cancelCreateProject() {
    this.isCreatingProjectSignal.set(false);
  }


  selectProject(selected: Project | undefined){
    this.projectCollaboratorsSelectedSignal.set(undefined);
    this.projectSelectedSignal.set(selected);
  }

  selectProjectCollaborators(selected: Project | undefined){
    this.projectSelectedSignal.set(undefined);
    this.projectCollaboratorsSelectedSignal.set(selected);
  }

  createProject(projectCreated : Project){
    this.projectCreatedSignal.set(projectCreated);
  }
}
