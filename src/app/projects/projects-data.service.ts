import { Injectable, signal } from '@angular/core';
import { Project } from './project/project';
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

  getProjectCollaborators(projectId: string): CollaboratorDetails[] {
    if (projectId === '1') {
      return [
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
        }
      ]
    }
    else {
      return [
        {
          id: "1",
          names: "Alice",
          surnames: "Johnson",
          email: "alice.johnson@example.com",
          periodDateTime: {
            _initDate: new Date("2019-06-10"),
            _finalDate: new Date("2025-12-31")
          }
        }
      ]
    }
  }
}
