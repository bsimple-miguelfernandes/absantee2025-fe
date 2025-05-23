import { Injectable, signal } from '@angular/core';
import { Project } from './project/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  private projectsSignal = signal<Project[]>([
    {
      id: '1',
      title: "Project1",
      acronym: "P1",
      periodDate: {
        initDate: new Date("2021-02-01"),
        finalDate: new Date("2024-07-30")
      }
    },
    {
      id: '2',
      title: "Project2",
      acronym: "P2",
      periodDate: {
        initDate: new Date("2022-03-01"),
        finalDate: new Date("2027-09-30")
      }
    }
  ]);

  readonly projects = this.projectsSignal.asReadonly();

  getProjectByAcronym(acronym: string): Project{
    return this.projectsSignal().find(p => p.acronym === acronym)!;
  }
}
