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

  getCollaboratorsOfProject(collaboratorId: string): AssociationProjectCollaborators[] {
    if (collaboratorId === '1') {
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
          projectAcronym: "P2",
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
