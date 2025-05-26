import { Injectable } from '@angular/core';
import { AssociationProjectCollaborators } from './association-project-collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class AssociationsProjectCollaboratorDataService {

  constructor() { }

  getProjectCollaborators(projectId: string): AssociationProjectCollaborators[] {
    if (projectId === '1') {
      return [
        {
          projectId: "1",
          projectAcronym: "P1",
          collabId: "1",
          collabEmail: "alice.johnson@example.com",
          periodDate: {
            initDate: new Date("2019-06-10"),
            finalDate: new Date("2025-12-31")
          }
        },
        {
          projectId: "1",
          projectAcronym: "P1",
          collabId: "2",
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
          projectId: "2",
          projectAcronym: "P2",
          collabId: "1",
          collabEmail: "alice.johnson@example.com",
          periodDate: {
            initDate: new Date("2019-06-10"),
            finalDate: new Date("2025-12-31")
          }
        }
      ]
    }
  }

  getCollaboratorsOfProject(collaboratorId: string): AssociationProjectCollaborators[] {
    if (collaboratorId === '1') {
      return [
        {
          projectId: "1",
          projectAcronym: "P1",
          collabId: "1",
          collabEmail: "alice.johnson@example.com",
          periodDate: {
            initDate: new Date("2019-06-10"),
            finalDate: new Date("2025-12-31")
          }
        },
        {
          projectId: "2",
          projectAcronym: "P2",
          collabId: "1",
          collabEmail: "alice.johnson@example.com",
          periodDate: {
            initDate: new Date("2021-02-01"),
            finalDate: new Date("2024-07-30")
          }
        }
      ]
    }
    else {
      return []
    }
  }
}
