import { inject, Injectable, signal } from '@angular/core';
import { CollaboratorDetails } from './collaborator-details/collaborator-details';
import { PeriodDate } from '../PeriodDate';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AssociationProjectCollaborators } from '../associations-project-collaborator/association-project-collaborator.model';
import { Collaborator } from './collaborator';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorDataService {
  private httpClient = inject(HttpClient);

  /* getCollaboratorByEmail(email: string): CollaboratorDetails {
    return this.collaboratorsSignal().find(c => c.email === email)!;
  } */

  updateCollaborator(updatedCollaborator: Collaborator) {
    return this.httpClient.put<Collaborator>("http://localhost:5073/api/collaborators", updatedCollaborator);
  } 

  private CollaboratorHolidays: { collaboratorId: string, holidays: PeriodDate[] }[] = [
    {
      collaboratorId: "1",
      holidays: [
        {
          initDate: new Date("2020-01-01"),
          finalDate: new Date("2020-01-10")
        },
        {
          initDate: new Date("2020-12-01"),
          finalDate: new Date("2020-12-10")
        }
      ]
    },
    {
      collaboratorId: "2",
      holidays: [
        {
          initDate: new Date("2020-06-06"),
          finalDate: new Date("2020-06-16")
        }
      ]
    },
    {
      collaboratorId: "3",
      holidays: []
    }
  ]

  getCollaboratorHolidays(collaboratorId: string): PeriodDate[] {
    return this.CollaboratorHolidays.find(c => c.collaboratorId === collaboratorId)!.holidays;
  };

  editHoliday(collaboratorId: string, index: number, updatedPeriod: PeriodDate) {
    const holidays = this.CollaboratorHolidays.find(c => c.collaboratorId === collaboratorId)?.holidays;

    if (holidays !== undefined) {
      holidays[index] = updatedPeriod;
    }
  }

  getAssociations(id: string): Observable<AssociationProjectCollaborators[]> {
    return this.httpClient.get<AssociationProjectCollaborators[]>('http://localhost:5073/api/collaborators/' + id + "/associations");
  }
}
