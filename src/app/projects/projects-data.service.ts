import { Injectable, signal } from '@angular/core';
import { Project, ProjectCollaborators } from './project/project';
import { Collaborator } from '../collaborators/collaborator';
import { CollaboratorDetails } from '../collaborators/collaborator-details/collaborator-details';

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

  getProjectCollaborators(projectId: string): ProjectCollaborators[] {
    if (projectId === '1') {
      return [
        {
          projectAcronym: "P1",
          collabEmail: "alice.johnson@example.com",
          periodDate: {
            initDate: new Date("2019-06-10"),
            finalDate: new Date("2025-12-31")
          }
        },
        {
          projectAcronym: "P1",
          collabEmail: "bob.martinez@example.com",
          periodDate: {
            initDate: new Date("2021-02-01"),
            finalDate: new Date("2024-07-30")
          }
        }
      ]
    }
    else {
      return [
        {
          projectAcronym: "P2",
          collabEmail: "alice.johnson@example.com",
          periodDate: {
            initDate: new Date("2019-06-10"),
            finalDate: new Date("2025-12-31")
          }
        }
      ]
    }
  }
}
